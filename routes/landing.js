const router = require('express').Router();

router.get('/', (req, res)=> {
    res.send({"msg": "Hello World"})
})

module.exports = router;