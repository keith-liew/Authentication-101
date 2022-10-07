const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    secrets: [String],
    hash: String,
});

module.exports = mongoose.model("User", userSchema);