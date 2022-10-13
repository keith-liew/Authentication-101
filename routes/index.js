const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
//route setting
// router.use("/users", require("./users"))

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/login", successRedirect:"/secrets"}));

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err.message);
            res.redirect("/register");
        } else {
            req.login(user, function (err){
                if (err){
                    console.log(err.message);
                } else {
                    res.redirect("/secrets");
                }
            })
        }
    });
});

router.get("/secrets", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

router.get("/submit", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err){
            console.log(err.message);
        } else {
            res.redirect("/secrets");
        }
    });
});

module.exports = router;