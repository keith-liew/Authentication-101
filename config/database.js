require("dotenv").config();

const mongoose = require("mongoose");

let dbString ="";
if(process.env.ENVIRONMENT === "production"){
    dbString = process.env.MONGODB_ATLAS_URL;
} else {
    dbString = "mongodb://localhost:27017/authdb";
}
mongoose.connect(dbString);
const db = mongoose.connection;
db.on("error", (error) => { console.log(error) });
db.on("connected", () => { console.log("Connected to database") });

