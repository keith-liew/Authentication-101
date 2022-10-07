const router = require("express").Router();
const User = require("../models/User");
const md5 = require("md5");
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
    const password = md5(req.body.password);

    User.findOne({ username: username })
        .then((user) => {
            //if user not found
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }
            //user found
            //and check user password
            if (user.password === password) {
                res.status(200).render("secrets");
            } else {
                res.status(401).json({ success: false, msg: "Unauthorized user" })
            }
        })
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: md5(req.body.password)
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

router.get("/secrets", (req, res) => {
    res.render("secrets");
});

router.get("/submit", (req, res) => {
    res.render("submit");
});
module.exports = router;