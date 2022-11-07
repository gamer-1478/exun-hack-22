const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
    id: String,
    game_id: String,
    asset_name: String,
    url: String,
    description: String,
})

module.exports= mongoose.model("Asset", assetSchema)