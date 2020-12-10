var boardModel = require('../models/board')
module.exports.addMember = (req, res, next) => {
    boardModel.findByIdAndUpdate(req.params.id, { members: req.body.memberArray }, { new: true }, (err, docs) => {
        if (err)
            throw err
        res.json({
            success: true
        })
    })
}