const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    id: String,
    game_name: String,
    assets: [{type: String}],
    installation_link: String,
    cost: Number,
    images: [{type: String}],
    videos: [{type: String}],
})

export default mongoose.model("Game", gameSchema)