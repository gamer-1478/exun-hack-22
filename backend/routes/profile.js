const userSchema = require('../schemas/userSchema');

const router = require('express').Router();


router.post('/', async (req, res) => {
    const {name, email} = req.body;
    const user = await userSchema.findOne({email: email});
    if (user) {
        user.name = name;
        user.email = email;
        await user.save();
        res.send({ success: true});
    }
    else {
        res.send({ success: false});
    }
})



module.exports = router;