var userModel = require('../models/user')
const jwt = require('jsonwebtoken')
module.exports.getMembers = (req, res, next) => {
    jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err)
            throw err
        userModel.find({ email: { $ne: user.email } }, (err, docs) => {
            if (err)
                throw err
            res.json({
                success: true,
                members: docs.map(para => { return { name: para.name, id: para.id, email: para.email } })
            })
        })
    })

}