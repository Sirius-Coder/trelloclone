var boardModel = require('../models/board')
module.exports.createBoard = (req, res, next) => {
    var record = new boardModel({
        title: req.body.title,
        members: req.body.members
    })
    record.save()
    res.json({
        success: true,
        msg: 'Board created successfully'
    })
}