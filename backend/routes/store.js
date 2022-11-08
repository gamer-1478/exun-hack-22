const router = require('express').Router();

const Game = require('../schemas/gameSchema');

router.get('/', async (req, res)=> {
    try{
        const games = await Game.find({})
        res.send(games)
    }catch(err){
        res.send({"msg":`${err}`})
    }
})

router.get('/:gameId', async(req, res)=>{
    const id = req.params.gameId 
    try{
        const game = await Game.findOne({id:id})
        if(!game){
            res.send({"msg": "No Game Found!"})
        }else{
            res.send(game)
        }
    }catch(err){
        res.send({"msg":`${err}`})
    }
})

router.get('/:gameId/assets', async (req, res) => {
    const id = req.params.gameId 
    try{
        const game = await Game.findOne({id:id})
        if(!game){
            res.send({"msg": "No Game Found!"})
        }else{
            res.send(game.assets)
        }
    }catch(err){
        res.send({"msg":`${err}`})
    }
})



module.exports = router;