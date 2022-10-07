const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    secrets: [String],
    password: String,
});

module.exports = mongoose.model("User", userSchema);