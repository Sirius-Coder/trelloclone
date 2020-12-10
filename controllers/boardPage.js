var boardModel = require('../models/board')
const jwt = require('jsonwebtoken')
module.exports.boardPage = (req, res, next) => {
    jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'You are not a member of this board'
            })
        } else {
            //Checking whether the user is member of the board or not
            boardModel.findOne({ _id: req.params.id, "members.id": user.id }, (err, docs) => {
                if (err)
                    throw err
                else if (docs === null) {
                    res.json({
                        success: false,
                        msg: 'You are not a member of this board'
                    })
                } else {
                    res.json({
                        success: true,
                        board: docs
                    })
                }

            })
        }
    })

}