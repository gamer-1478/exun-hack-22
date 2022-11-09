const router = require('express').Router();

const Game = require('../schemas/gameSchema');

router.get('/', async (req, res)=> {
    try{
        const games = await Game.find({})
        //break games in groups of 3
        const gamesGroups = []
        let group = []
        games.forEach((game, index) => {
            group.push(game)
            if(index % 3 === 2){
                gamesGroups.push(group)
                group = []
            }
        })
        if(group.length > 0){
            gamesGroups.push(group)
        }
        
        res.send(gamesGroups)
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