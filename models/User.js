const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: String,
    secrets: [String],
    hash: String,
    salt: String,
});

module.exports = mongoose.model("User", userSchema);