const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwt = require('passport-jwt')
const userService = require("../services/user.service")
const {signJwt} = require("../utils/jwt.utils");

passport.use(
    new PassportJwt.Strategy(
        {
            jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
            algorithms: [process.env.JWT_ALGORITHM],
            passReqToCallback: true
        },
        async (req, payload, done) => {
            try {
                const user = await userService.getUserById(payload.sub)
                done(null, user)
            } catch (err) {
                console.error(err);
                done(err, false)
            }
        }
    )
)

function validateAndGenerateToken(generateNewTokenIfInvalid) {
    return function (req, res, next) {
        passport.authenticate('jwt', {session: false}, async function (err, user, info) {
            if (!user) {
                if (generateNewTokenIfInvalid) {
                    try {
                        const userDocument = await userService.createUser({});
                        res.locals.user = userDocument;
                        res.locals.token = signJwt(userDocument._id.toString())
                        next()
                    } catch (err) {
                        console.error(err);
                        res.status(500).json({error: "Unable to create user"})
                    }
                } else {
                    res.status(401).json({error: "Unauthorized"})
                }
            } else {
                res.locals.user = user;
                next()
            }

        })(req, res, next)
    }
}


module.exports = {
    requireJWT: validateAndGenerateToken,
}
