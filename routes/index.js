const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");

//route setting
// router.use("/users", require("./users"))

router.get("/", (req, res) => {
    res.render("home");
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/secrets', passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/secrets" }));

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err.message);
            res.redirect("/register");
        }
        req.login(user, function (err) {
            if (err) { return next(err); }
            return res.redirect("/secrets");
        });

    });
});

router.get("/secrets", (req, res) => {
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
        }
        res.redirect("/");
    });
})

module.exports = router;