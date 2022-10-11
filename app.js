require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cookieParser());

require("./config/database");
const User = require("./models/User");

require("./config/passport")(passport);

app.use(routes);

app.listen(3000, () => {
    console.log("Server started on port 3000");
})