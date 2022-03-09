const passport = require('passport');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {config} = require('../../config');

// Basic strategy
require('../../utils/auth/estrategies/basic');

const auth = (req,res,next) => {
    passport.authenticate('basic', function(error,user){
        try {
            if (error || !user) {
                next(Boom.unauthorized());
            }
            req.login(user, {session: false}, function(error){
                if(error){
                    next(error);
                }
                const payload = {sub: user.username, email:user.email};
                const token = jwt.sign(payload, config.authJwtSecret, {
                    expiresIn: "15m"
                });
                return res.status(200).json({access_token:token});
            })
        } catch (error) {
            next(error);
        }
    })(req,res,next);
}
module.exports = auth;       