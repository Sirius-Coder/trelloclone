var boardModel = require('../models/board')
module.exports.getBoards = (req, res, next) => {
    boardModel.find({ "members.id": req.params.id }, (err, docs) => {
        if (err)
            throw err
        res.json({
            success: true,
            boards: docs.map(para => { return { title: para.title, id: para.id } })
        })
    })
}