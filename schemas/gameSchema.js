const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    id: String,
    game_name: String,
    assets: [{type: String}],
    installation_link: String,
    cost: Number,
    images: [String],
    videos: [String],
    description: String
})

module.exports = mongoose.model("Game", gameSchema)