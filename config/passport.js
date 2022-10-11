const fs = require("fs");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const path = require("path");

const keyPath = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(keyPath, "utf-8");

//Custom token extractor
var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies && req.cookies.token) {
        token = req.cookies['token'].split(' ')[1]
    }
    return token;
};

//In normal case we can use ExtractJwt.fromWhateverSetting to grab the token from a request header
//Since the token is passed into a cookie, then there should be custom extractor function to grab the token from it
//Option for jwtStrategy includes (extractor function, key and type of algorithm)
const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"]
}

/**
 * jwtStrategy will do the token extraction and verification,
 * once it's done with the verification it will be pass as a payload
 * then the "sub" attribute as a subject so that it can be extracted
 * and query in database
 */
const strategy = new JwtStrategy(options, (payload, done) => {
    User.findById(payload.sub)
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null));
})

module.exports = (passport) => {
    passport.use(strategy);
}