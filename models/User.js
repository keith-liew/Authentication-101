const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    secrets: [String],
    salt: String,
    hash: String,
    googleId: String,
    facebookId: String,
});

userSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", userSchema);