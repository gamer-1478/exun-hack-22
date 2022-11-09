const router = require('express').Router()
require('dotenv').config()
const Game = require("../schemas/gameSchema");
const Asset = require("../schemas/assetSchema");
const { ensureAuthenticated } = require('../middleware/authenticate.js')
const stripe = require('stripe')(process.env.STRIPE_KEY);

router.get('/', (req, res) => {
    console.log(req.user.cart)
    if (!req.user.cart.length > 0) {
        return res.render("cart", { user: req.user, cart: [], total: 0 });
    }
    var total = 0;
    var products = req.user.cart.map(async (product_orig) => {
        var product = await Game.findOne({ id: product_orig.prodid }) || await Asset.findOne({ id: product_orig.prodid })
        product = JSON.parse(JSON.stringify(product))
        total += product.cost
        return product;
    })
    Promise.all(products).then(prods => {
        res.render("cart", { user: req.user, cart: products, total: total })
    }).catch(err => {
        console.log(err)
    })
})


router.get('/add/:id', ensureAuthenticated, async (req, res) => {
    const store_id = req.params.id;
    var product = await Game.findOne({ id:store_id}) || await Asset.findOne({ id:store_id})
    req.user.total+=product.cost
    var cart = req.user.cart;
    cart.push(store_id);
    req.user.cart = cart
    req.user.save();
    res.send({ msg: "Added to cart" })
})

router.post('/delete/:id', ensureAuthenticated, async (req, res) => {
    var id = req.params.id;
    var cart = req.user.cart;
    var index = cart.findIndex(product => product.id === id);
    cart.splice(index, 1);
    var product = await Game.findOne({ id:store_id}) || await Asset.findOne({ id:store_id})
    req.user.total-=product.cost
    req.user.cart = cart;
    req.user.save();
    res.send({ success: true });
})

router.get('/checkout-confirm', ensureAuthenticated, async (req, res) => {
    const successUrl = process.env.HOSTNAME + '/cart/success';
    const cancelUrl = process.env.HOSTNAME + '/cart';
    console.log(req.user.total)
    if (req.user.total==0){
        res.redirect(cancelUrl)
        return;
    }
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {   
                quantity: 1,
                price_data: {
                        unit_amount: req.user.total*100,
                        currency: 'inr',
                        product_data: {
                            name: 'Cart Checkout',
                            description: 'Payment',
                        }
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
    });
    var lib = req.user.library;
    console.log(lib)
    lib = lib + (req.user.cart)
    req.user.library = lib;
    console.log(lib, req.user.library)
    req.user.cart = [];
    req.user.total = 0;
    console.log(req.user.total)
    req.user.save();
    res.redirect(303, session.url);
});
module.exports = router;