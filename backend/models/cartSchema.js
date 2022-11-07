const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    id: String,
    cart_products: [{name_type: String, store_id: String}],
    payment_status: Boolean,
    payment_link: String,
})

export default mongoose.model("Cart", cartSchema)