const JWT = require("jsonwebtoken");

function signJwt(userId) {
    return  JWT.sign(
        {
            id: userId
        },
        process.env.JWT_SECRET,
        {
            algorithm: process.env.JWT_ALGORITHM,
            subject: userId
        }
    )
}
module.exports = {
    signJwt
}
