require("dotenv").config()
const express = require('express')
const app = express()
    session = require('cookie-session'),
    passport = require('passport')
const mongoose = require('mongoose')


//file imports
const landing = require('./routes/landing')
const auth = require('./routes/auth')
const adminAdd = require('./routes/add')
const store = require('./routes/store')

//middlewares
app.use(express.json({ limit: '50mb' }), express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static('public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))

//connect to mongodb
const dbUri = process.env.MONGO_URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Connected to mongodb"))

//initialize passport after this

//routing
app.use('/', landing)
app.use('/auth', auth)
app.use('/add', adminAdd)
app.use('/store', store)

//listen
const PORT = 8080 || process.env.PORT
app.listen(PORT, ()=> console.log(`Connected on port ${PORT}`))