const router = require('express').Router();
const Game = require('../schemas/gameSchema.js')
const Asset = require('../schemas/assetSchema.js')
const adminAuth = require('../middleware/authenticate.js')
const { uuid } = require('uuidv4');

router.post('/game', async (req, res) => {
    const { game_name, cost, installation_link, images, videos } = req;
    if (game_name != '' && installation_link != '') {
        const gameID = uuid()
        const assets = []
        const newgame = new Game({
            id: gameID,
            game_name,
            assets,
            installation_link,
            cost,
            images,
            videos,
        })
        await newgame.save()
        console.log("game added", game_name)
    }
})

router.post('/asset', async (req, res)=>{
    const {game_id, asset_name, url, description} = req;
    if (asset_name!='', game_id!=''){
        const assetID = uuid()
        const newAsset = new Asset({
            id: assetID,
            game_id,
            asset_name,
            url,
            description
        })

        await newAsset.save()
        const game = await Game.findOne({id: game_id})
        game.assets += assetID
        game.save()
        console.log('Added asset'+assetID+'to game'+game_id)
    }
})

router.post('/')
module.exports = router;