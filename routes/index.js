const router = require("express").Router();
const User = require("../models/User");
const crypto = require("crypto");
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

    User.findOne({ username: username })
        .then((user) => {
            //if user not found
            if (!user) {
                res.status(400).json({ success: false, msg: "User not found" });
            }
            //user found
            //and check user password
            const encryptedOriginal = crypto.pbkdf2Sync(req.body.password, user.salt, 10000, 64, "sha512").toString("hex");

            if (user.hash === encryptedOriginal) {
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
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 10000, 64, "sha512").toString("hex");

    const newUser = new User({
        username: req.body.username,
        salt: salt,
        hash: hash,
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