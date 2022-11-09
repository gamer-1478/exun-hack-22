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

router.post('/delete/:id', ensureAuthenticated, (req, res) => {
    var id = req.params.id;
    var cart = req.user.cart;
    var index = cart.findIndex(product => product.id === id);
    cart.splice(index, 1);
    req.user.cart = cart;
    req.user.save();
    res.send({ success: true });
})

router.get('/checkout-confirm', ensureAuthenticated, async (req, res) => { // need total
    const successUrl = process.env.HOSTNAME + '/cart/success';
    const cancelUrl = process.env.HOSTNAME + '/cart';
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {   
                quantity: 1,
                price_data: {
                        unit_amount: req.user.total,
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
    res.redirect(303, session.url);
});


router.get('/success', (req, res) => {
    //adding games to library
    var lib = req.user.library;
    lib.push(req.user.cart)
    req.user.cart = [];
    req.user.library = lib;
    req.user.save();
    res.render('')
})
module.exports = router;