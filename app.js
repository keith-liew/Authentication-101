require("dotenv").config();

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const connection = require("./config/database");
const User = require("./models/User");

//session setting
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}))

//passport config
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
})