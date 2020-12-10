var boardModel = require('../models/board')
module.exports.updateBoard = (req, res, next) => {
    boardModel.findByIdAndUpdate(req.params.id, { todo: req.body.todo, development: req.body.development, reviewed: req.body.reviewed, finished: req.body.finished }, { new: true }, (err, docs) => {
        if (err)
            throw err
        res.json({
            success: true,
            msg: 'The Board has been updated 1'
        })
    })
}