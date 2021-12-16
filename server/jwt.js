const jwt = require('jsonwebtoken')
require('dotenv').config()

const createToken = (user) => {
    const accessToken = jwt.sign({
        username: user.users_username,
        email: user.users_email,
        imageUrl: user.users_imageurl,
        alterationDate: user.alterationDate,
    }, process.env.ACCESS_TOKEN_SECRET_KEY)
    return accessToken
}

module.exports = { createToken }