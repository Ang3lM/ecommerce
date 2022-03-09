const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const Boom = require('@hapi/boom');
const {config} = require('../../../config');
const User = require('../../../models/Users');

passport.use(new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
},async function(jwt_payload,done){
        try {
            const user = await User.findOne({username:jwt_payload.sub});
            if(!user){
                return done(Boom.unauthorized(),false);
            }
            return done(null,user);
        } catch (error) {
            return done(Boom.unauthorized(),false);
        }
    }
))