const mongoose = require('mongoose')

//Setting up the Schema
var boardSchema = new mongoose.Schema({
    title: {
        type: String
    },
    members: [{
        name: String,
        id: {
            type: String
        },
        email: String
    }],
    todo: [],
    development: [],
    reviewed: [],
    finished: []
})

var boardmodel = mongoose.model('boards', boardSchema)

module.exports = boardmodel