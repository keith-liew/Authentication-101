const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const jsonwebtoken = require("jsonwebtoken");

const privKeyPath = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(privKeyPath, "utf-8");

function validPassword(password, hash, salt) {
    //mimic setting of passport-local-mongoose
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 25000, 512, "sha256").toString("hex");
    return hash == hashedPassword;
}

function generatePassword(password) {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 25000, 512, "sha256").toString("hex");

    return { salt: salt, hash: hash };
}

function issueJwt(user) {
    const _id = user._id;

    const expiresIn = "1d";

    const payload = {
        sub: _id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });

    return {
        token: "Bearer " + signedToken,
        expire: expiresIn,
    }
}

module.exports.validPassword = validPassword;
module.exports.generatePassword = generatePassword;
module.exports.issueJwt = issueJwt;
