const router = require('express').Router()

router.get('/', (req, res)=> {
    if (!req.user.cart.length > 0) {
        return res.render("store/cart", { user: req.user, cart: [], total: 0 });
    }
    var total = 0;
    var products = req.user.cart.map( async (product_orig)=> {
        var product = await Product.findOne({ productId: product_orig.prodid })
        product = JSON.parse(JSON.stringify(product))
        total += product.price * product_orig.quan
        product.quantity = product_orig.quan
        return product;
    })
    Promise.all(products).then(products => {
        res.render("store/cart", { user: req.user, cart: products, total: total})
    }).catch(err => {
        console.log(err)
    })
})