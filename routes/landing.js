const router = require('express').Router();
const {ensureAuthenticated} = require('../middleware/authenticate')
router.get('/', ensureAuthenticated, async (req, res) => {
    res.render('index', {'path': process.cwd()})
})

module.exports = router;