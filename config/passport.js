require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
},
    function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        User.findOne({ username: profile.emails[0].value, googleId: profile.id })
            .then((user) => {
                if (!user) {
                    const newUser = User({
                        username: profile.emails[0].value,
                        googleId: profile.id
                    })
                    newUser.save().then((user) => { return cb(null, user) });
                } else {
                    return cb(null, user);
                }
            })
            .catch((err) => { return cb(true, false) });
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/secrets",
    profileFields: ["email"]
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    User.findOne({ username: profile.emails[0].value, facebookId: profile.id })
            .then((user) => {
                if (!user) {
                    const newUser = User({
                        username: profile.emails[0].value,
                        facebookId: profile.id
                    })
                    newUser.save().then((user) => { return cb(null, user) });
                } else {
                    return cb(null, user);
                }
            })
            .catch((err) => { return cb(true, false) });
  }
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());