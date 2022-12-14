const mongoose = require('mongoose'),
    reqString = { type: String, required: true },
    nonreqString = { type: String, required: false },
    reqBoolean = { type: Boolean, required: true, default: false },
    moment = require('moment'),
    now = new Date(),
    dateStringWithTime = moment(now).format('YYYY-MM-DD HH:MM:SS');

const userSchema = new mongoose.Schema({
    email: reqString,
    name: reqString,
    password: reqString,
    date: {
        type: String,
        default: dateStringWithTime
    },
    userId: reqString,
    isAdmin: Boolean,
    cartid: String,
    cart: [String],
    orders: [String],
    library: [String],
    total: {type: Number, default:0},
})

module.exports = mongoose.model("User", userSchema)