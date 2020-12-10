const jwt = require('jsonwebtoken')
module.exports.authenticate = (req, res, next) => {
    //Verify whether the request is coming from a logged user or not
    jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN, { maxAge: '3h' }, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Not Authenticated !'
            })
        }
        res.json({
            success: true,
            msg: 'Login Successfull',
            name: user.name,
            email: user.email,
            id: user.id
        })
    })
}