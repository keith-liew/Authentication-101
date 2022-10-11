const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: String,
    secrets: [String],
    salt: String,
    hash: String
});

module.exports = mongoose.model("User", userSchema);