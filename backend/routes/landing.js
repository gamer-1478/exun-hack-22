const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send({ "msg": blobs })
})

module.exports = router;