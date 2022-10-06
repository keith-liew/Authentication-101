require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_STRING);
const db = mongoose.connection;
db.on("error", (error) => { console.log(error) });
db.on("connected", () => { console.log("Connected to database") });

