var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req, res){
    res.render("landing");
});




//AUTH Routes
router.get("/register",function(req, res){
    res.render("register");
});

router.post("/register",function(req, res){
   User.register(new User({username:req.body.username}), req.body.password, function(err, user){
       if(err){
           req.flash("error",err.message);
           return res.render("register" ,{"error": err.message});
       }passport.authenticate("local")(req, res, function(){
           req.flash("success","Welcome to Infosys Space"+ user.username);
           res.redirect("/campgrounds");
       });
   });
});

router.get("/login",function(req, res){
    req.flash("success","Please Log In!");
    res.render("login");
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req, res){
    
});

router.get("/logout",function(req, res){
    req.logout();
    req.flash("success","Successfully Logged Out!");
    res.redirect("/campgrounds");
});




module.exports = router;