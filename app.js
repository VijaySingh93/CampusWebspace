var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var LocalStrategy = require("passport-local");
var bodyParser = require('body-parser');
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");



var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");

app.locals.moment = require('moment');

var url = process.env.DATABASEURL || "mongodb://localhost/YelpCamp";
mongoose.connect(url);
//mongodb://Vijay:Infy@ds023213.mlab.com:23213/yelpcamp
// seedDB();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(function(req, res, next) {
  res.locals.current_path = req.path;
  next();
});


app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Server has started');
});
