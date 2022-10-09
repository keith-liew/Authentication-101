const passport = require("passport");
const validPassword = require("../lib/utils").validPassword;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                done(null, false);
            }

            isValid = validPassword(password, user.hash, user.salt);

            if (isValid) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch((error) => {
            done(error);
        })
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});
passport.deserializeUser(function (username, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            done(err, false);
        } else {
            done(null, user);
        }
    })
});