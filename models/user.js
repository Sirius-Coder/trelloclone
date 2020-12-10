const mongoose = require('mongoose')

//Creating our Schema
var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: {
        type: String
    }
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel