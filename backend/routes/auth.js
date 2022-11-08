const router = require('express').Router();
const User = require('../schemas/userSchema.js'),
    bcrypt = require("bcrypt"),
    { uuid } = require('uuidv4');
    passport = require('passport');

router.get('/login', function (req, res) {
    res.render('login', {path: process.cwd()})
})

router.get('/register', (req, res)=>{
    res.render('register', {path: process.cwd()})
})
//register
router.post('/register', async (req, res)=>{
    let errors = [];
    const { name, email, password, confirmPassword } = req;
  
    if (!name || !email || !password) {
      errors.push({ msg: "All fields are required" })
    };
    if (password !== confirmPassword) {
      errors.push({ msg: "Passwords do not match" });
    }
    if (errors.length > 0) {
      res.send(errors);
    } else {
  
      User.findOne({ email: email }).then((user) => {
        if (user) {
          errors.push({ msg: "User already exists, try logging in instead." })
          return res.send(errors)
        }
        const userId = uuid();
        const newUser = new User({
          name: name,
          email: email,
          password: password,
          userId: userId,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
              User.findOne({ email: req.body.email }).then(user => {
                passport.authenticate('local', (err, user, info) => {
                  if (err) throw err;
                  if (!user) res.send({ "msg": `${info.message}` });
                  else {
                    req.logIn(user, (err) => {
                      if (err) throw err;
                      res.send({ "msg": "Successfully Authenticated", "success": "true" });
                    });
                  }
                })(req, res); 
              })
            }).catch((err) => console.log(err));
          })
        );
      });
    }
  
})

router.post('/login', async (req, res) => {
    User.findOne({ email: req.email }).then(user => {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err;
            if (!user) res.send({ "msg": `${info.message}` });
            else {
                req.logIn(user, (err) => {
                    if (err) throw err;
                    res.send({ "msg": "Successfully Authenticated", "success": "true" });
                });
            }
        })(req, res, next);
    })

})

module.exports = router;
