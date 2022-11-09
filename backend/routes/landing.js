const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('index', {'path': process.cwd()})
})

module.exports = router;