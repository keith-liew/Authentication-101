require("dotenv").config();

const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(User.createStrategy());

let googleCallbackURL ="";
if(process.env.ENVIRONMENT === "production"){
    googleCallbackURL = process.env.GOOGLE_REDIRECT_URL;
} else {
    googleCallbackURL = "http://localhost:3000/auth/google/secrets";
}
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: googleCallbackURL,
},
    function (accessToken, refreshToken, profile, cb) {
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

let facebookCallbackURL ="";
if(process.env.ENVIRONMENT === "production"){
    facebookCallbackURL = process.env.FACEBOOK_REDIRECT_URL;
} else {
    facebookCallbackURL = "http://localhost:3000/auth/facebook/secrets";
}

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: facebookCallbackURL,
    profileFields: ["email"]
  },
  function(accessToken, refreshToken, profile, cb) {
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