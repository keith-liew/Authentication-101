const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    secrets: [String]
});

//hash and salt by passport-local-mongoose
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);