const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");
const isAuth = require("./authMiddleware").isAuth;

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


router.post("/delete", (req, res) => {
    User.deleteOne({ username: req.user.username })
        .then(() => {
            req.logout((err) => {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                } else {
                    res.redirect("/");
                }
            })
        })
        .catch(err => { console.log(err) });
});


router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/secrets" }));

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect("/");
    });
})

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err.message);
            res.redirect("/register");
        } else {
            req.login(user, function (err) {
                if (err) { console.log(err) }
                return res.redirect("/secrets");
            });
        }
    });
});

router.get("/secrets", isAuth, (req, res) => {
    let oauthUser = false;
    if (req.user.facebookId != null || req.user.googleId != null) {
        oauthUser = true;
    }
    User.find({ secrets: { $ne: [] } }, { secrets: 1, googleId: 1, facebookId: 1 })
        .then(usersWithSecrets => {
            secrets = [];
            usersWithSecrets.forEach((user) => {
                secrets = [].concat(secrets, user.secrets);
            });
            res.render("secrets", { secrets: secrets, oauthUser: oauthUser });
        })
});

router.delete("/secret/:content", (req, res) => {
    req.user.secrets.pull(req.params.content);
    req.user.save()
        .then(() => { res.redirect("/submit"); })
        .catch(err => {
            console.log(err);
            res.redirect("/secrets");
        })
});

router.get("/submit", isAuth, (req, res) => {
    // res.render("submit");
    User.findById(req.user.id, { secrets: 1 })
        .then(user => {
            res.render("submit", { secrets: user.secrets });
        })
});

router.post("/submit", (req, res) => {
    User.findById(req.user.id)
        .then((user) => {
            user.secrets.push(req.body.secret);
            user.save().then(() => {
                res.redirect("/secrets");
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("/secrets");
        })
});

module.exports = router;