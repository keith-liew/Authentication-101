const crypto = require("crypto");

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

module.exports.validPassword = validPassword;
module.exports.generatePassword = generatePassword;