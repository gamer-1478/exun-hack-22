require("dotenv").config()
const express = require('express')
const app = express()
    session = require('cookie-session'),
    passport = require('passport')


//file imports
const landing = require('./routes/landing')
const auth = require('./routes/auth')

//middlewares
app.use(express.json({ limit: '1mb' }), express.urlencoded({ extended: true, limit: '1mb' }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

//connect to mongodb
// const dbUri = process.env.MONGO_URI
// mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Connected to mongodb"))

//initialize passport after this


//routing
app.use('/', landing)
app.use('/auth', auth)

//listen
const PORT = 8080 || process.env.PORT
app.listen(PORT, ()=> console.log(`Connected on port ${PORT}`))