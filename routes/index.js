const router = require("express").Router();
const User = require("../models/User");
const generatePassword = require("../lib/utils").generatePassword;
const issueJwt = require("../lib/utils").issueJwt;
const validPassword = require("../lib/utils").validPassword;
const passport = require("passport");

//route setting
// router.use("/users", require("./users"))

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) {
                res.status(400).json({ success: false, msg: "Could not find user" });
            }

            isValid = validPassword(req.body.password, user.hash, user.salt);
            if (isValid) {
                const jwt = issueJwt(user);
                res.cookie(
                    "token",
                    jwt.token,
                    {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 24
                    });
                res.status(200).redirect("/secrets");
                //json({ success: true, token: jwt.token, expiresIn: jwt.expiresIn })
            } else {
                res.status(401).json({ success: false, msg: "Wrong password" });
            }
        })
        .catch(err => console.log(err));
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    saltHash = generatePassword(req.body.password);

    const newUser = new User({
        username: req.body.username,
        salt: saltHash.salt,
        hash: saltHash.hash
    });

    newUser.save()
        .then((user) => {
            const jwt = issueJwt(user);
            res.cookie(
                "token",
                jwt.token,
                {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 24
                });
            res.status(201).redirect("/secrets");
            //.json({ success: true, token: jwt.token, expiresIn: jwt.expiresIn })
        })
        .catch(err => { console.log(err); res.redirect("/register") });
});

router.get("/secrets", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.render("secrets");
});

router.get("/submit", (req, res) => {
    res.render("submit");
});

router.get("/logout", (req, res) => {
    res.clearCookie("token"),
        res.redirect("/");
})

module.exports = router;