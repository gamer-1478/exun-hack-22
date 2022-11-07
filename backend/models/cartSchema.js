const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    id: String,
    cart_products: [{String}],
    payment_status: Boolean,
    payment_link: String,
})

export default mongoose.model("Cart", cartSchema)