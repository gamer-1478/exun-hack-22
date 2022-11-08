const router = require('express').Router();
const Game = require('../schemas/gameSchema.js')
const Asset = require('../schemas/assetSchema.js')
const adminAuth = require('../middleware/authenticate.js')
const { uuid } = require('uuidv4');

router.post('/game', async (req, res) => {
    try {
        const { game_name, assets, installation_link, cost, images, videos } = req.body;
        if (!game_name || !installation_link || !cost || !images || !videos) {
            return res.send({ errorMessage: "Please enter all required fields." });
        }
        if (cost < 0) {
            return res.send({ errorMessage: "Please enter a valid cost." });
        }
        const existingGame = await Game.findOne({ game_name });
        if (existingGame) {
            return res.send({ errorMessage: "Game already exists." });
        }
        const newGame = new Game({
            id: uuid(),
            game_name,
            assets,
            installation_link,
            cost,
            images,
            videos
        });
        const savedGame = await newGame.save();
        res.json(savedGame);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
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