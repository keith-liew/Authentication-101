const router = require("express").Router();

//route setting
// router.use("/users", require("./users"))

router.get("/", (req,res)=> {
    res.render("home");
});

router.get("/login", (req,res)=>{
    res.render("login");
});

router.get("/register", (req,res)=>{
    res.render("register");
});

router.get("/secrets", (req,res)=>{
    res.render("secrets");
});

router.get("/submit", (req,res)=>{
    res.render("submit");
});

module.exports = router;