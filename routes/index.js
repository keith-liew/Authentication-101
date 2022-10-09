const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const generatePassword = require("../lib/utils").generatePassword;
//route setting
// router.use("/users", require("./users"))

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/secrets" }))

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    const saltHash = generatePassword(req.body.password);
    const newUser = new User({
        username: req.body.username,
        hash: saltHash.hash,
        salt: saltHash.salt
    })

    newUser.save()
        .then((user) => {
            req.login(user, function (err) {
                if (err){
                    return console.log(err.message);
                } else {
                    return res.redirect("/secrets");
                }
            })
        })

        .catch(err => {
            console.log(err);
            res.status(404).redirect("/register");
        });
});

router.get("/secrets", (req, res) => {
    // console.log(req.user);
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.status(401).send("Unauthorized");
    }
});

router.get("/submit", (req, res) => {
    res.render("submit");
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err.message);
        } else {
            res.redirect("/");
        }
    })
})

module.exports = router;