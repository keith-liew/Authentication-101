require("dotenv").config();

const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    secrets: [String],
    password: String
});

//moogoose will handle the password encryption and decryption itself
//simplfied encryption with just one key string as SECRET, default options is { encryptionKey: encKey, signingKey: sigKey }
//selected <password> as the only encryption field
userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});

module.exports = mongoose.model("User", userSchema);