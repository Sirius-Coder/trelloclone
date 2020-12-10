module.exports.logout = (req, res, next) => {
    //Clearing the token from the cookie
    res.clearCookie('token')
    res.json({
        success: true,
        msg: 'User has been logged out!'
    })
}