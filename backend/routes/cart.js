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
        stripe.products.create({
            name: 'Cart Checkout',
            description: 'Payment',
        }).then(prod => {
            stripe.prices.create({
                unit_amount: total,
                currency: 'inr',
                prod: prod.id,
            }).then(price => {
                const price_id = price.id;
            });
        });
        res.render("cart", { user: req.user, cart: products, total: total, price_id})
    }).catch(err => {
        console.log(err)
    })
})


router.get('/add/:id', ensureAuthenticated, (req, res) => {
    const store_id = req.params.id;
    var cart = req.user.cart;
    cart.push(store_id);
    req.user.cart = cart
    req.user.save();
    res.redirect('/')
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

router.post('/checkout', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: req.price_id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `/checkout-success`,
      cancel_url: `/`,
    });
  
    res.redirect(303, session.url);
  });

module.exports = router;
