const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const saltRounds = 10;
//route setting
// router.use("/users", require("./users"))

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username })
        .then((user) => {
            //if user not found
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }
            //user found
            //and check user password
            bcrypt.compare(password, user.hash, function (err, result) {
                // result == true
                if (result) {
                    res.status(200).render("secrets");
                } else {
                    res.status(401).json({ success: false, msg: "Unauthorized user" })
                }
            });
        })
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            const newUser = new User({
                username: req.body.username,
                hash: hash
            })

            newUser.save()
                .then(() => {
                    //render secret page
                    res.status(201).render("secrets");
                })
                .catch((err) => {
                    res.status(404).json({ sucess: false, msg: err.message });
                })
        });
    });
});

router.get("/secrets", (req, res) => {
    res.render("secrets");
});

router.get("/logout", (req, res) => {
    res.redirect("/");
});

module.exports = router;