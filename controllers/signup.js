var bcrypt = require('bcryptjs')
var userModel = require('../models/user')

module.exports.signup = (req, res, next) => {
    //Hashing the user password before storing in the DB
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err)
            throw err
        var user = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            //Creating a new user in the Db
        user.save(user, (error, docs) => {
            if (error)
                res.json({ success: false, msg: 'Email already exist !' })
            else {
                res.json({ success: true, msg: 'User Added!' })
                console.log(`${docs.name} has been added to the database successfully`)
            }

        })

    })


}