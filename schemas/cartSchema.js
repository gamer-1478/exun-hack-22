const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    id: String,
    user_id: String,
    cart_products: [{name_type: String, store_id: String}],
    payment_status: Boolean,
    payment_link: String,
})

module.exports= mongoose.model("Cart", cartSchema)