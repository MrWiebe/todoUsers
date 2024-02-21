const passport = require('passport');
const {Strategy} = require('passport-local');
const {User} = require('../models');
const md5 = require('md5');

async function authenticate(username, password, done){
    const user = await User.findOne({
        where: {
            email: username
        }
    });
    if (!user || md5(password) !==user.password){
        return done(null, false, {message: 'Incorrect email or password.'});
    }
    return done(numm, {
        id: user.id,
        username: user.email,
        displayName: user.first_name
    });
}

const validationStrategy = new Strategy({
    usernameField: 'email',
    _passwordField: 'password'
}, authenticate);

passport.use(validationStrategy);

passport.serializeUser(function(user, cb){
    process.nextTick(function(){
        cd(null, {id:user.id, username: user.email, displayName: user.displayName})
    });
});

passport.deserializeUser(async function(user, cb){
    process.nextTick(function (){
        return cb(null, user);
    });
});

module.exports.passport = passport;