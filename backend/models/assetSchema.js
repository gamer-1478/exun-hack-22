const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
    id: String,
    game_id: String,
    asset_name: String,
    url: String,
})

export default mongoose.model("Asset", assetSchema)