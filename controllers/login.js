var bcrypt = require('bcryptjs')
var userModel = require('../models/user')
const jwt = require('jsonwebtoken')
module.exports.login = (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, docs) => {
        if (err)
            throw err
        if (docs == null) {
            res.json({
                success: false,
                msg: 'User does not exist'
            })
        } else {
            bcrypt.compare(req.body.password, docs.password, (err, result) => {
                if (err)
                    throw err
                if (result) {
                    //Create a JWT Token 
                    var token = jwt.sign({ email: docs.email, name: docs.name, id: docs.id }, process.env.ACCESS_TOKEN)
                    res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 3600 * 3 })
                    res.json({
                        success: true,
                        msg: 'Login Successfull'
                    })
                } else {
                    res.json({
                        success: false,
                        msg: 'Invalid Password'
                    })
                }
            })
        }

    })
}