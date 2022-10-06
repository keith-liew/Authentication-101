require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(require("./routes"));

app.listen(3000, () => {
    console.log("Server started on port 3000");
})