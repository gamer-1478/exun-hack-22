const router = require('express').Router()
const Game = require("../schemas/gameSchema");
const Asset = require("../schemas/assetSchema");
const {ensureAuthenticated} = require('../middleware/authenticate.js')

router.get('/', (req, res)=> {
    console.log('hey')
    console.log(req.user.cart)
    if (!req.user.cart.length > 0) {
        return res.render("store/cart", { user: req.user, cart: [], total: 0 });
    }
    var total = 0;
    var products = req.user.cart.map( async (product_orig)=> {
        var product = await Game.findOne({ id: product_orig.prodid }) || await Asset.findOne({ id: product_orig.prodid })
        product = JSON.parse(JSON.stringify(product))
        total += product.cost
        return product;
    })
    Promise.all(products).then(products => {
        res.render("store/cart", { user: req.user, cart: products, total: total})
    }).catch(err => {
        console.log(err)
    })
})


router.get('/add/:id', ensureAuthenticated, (req, res)=>{
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
    var index = cart.findIndex(product => product.prodid === id);
    cart.splice(index, 1);
    req.user.cart = cart;
    req.user.save();
    res.send({ success: true });
})

module.exports = router;