require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

require("./config/database");
const MongoStore = require("connect-mongo");

let dbString = "";
if(process.env.ENVIRONMENT === "production") {
    dbString = process.env.MONGODB_ATLAS_URL;
} else {
    dbString = "mongodb://localhost:27017/authdb";
}

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbString}),
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(require("./routes"));

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000");
})