const passport = require('passport');
const {BasicStrategy} = require('passport-http');
const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const User = require('../../../models/Users');

async function comparePassword(password_bd, password_user){
    const verifPassword = await bcrypt.compare(password_bd, password_user);
    return verifPassword;
}

passport.use(new BasicStrategy(
    function(username,password,done){
        try {
            User.findOne({username:username}, async function (err, user) {
                if(!user){
                    return done(Boom.unauthorized(),false);
                }
                const valuePassword = await comparePassword(password, user.password);
                if(!valuePassword){
                    return done(Boom.unauthorized(),false);
                }
                return done(null,user);
            });
        } catch (error) {
            return done(error);
        }
    }
));