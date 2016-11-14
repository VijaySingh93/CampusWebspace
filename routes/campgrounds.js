var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");

router.get("/",function(req, res){
    Campground.find({},function(err, campgrounds){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.render('campgrounds/index',{campgrounds:campgrounds});
        }
        
    });
});

router.post("/",middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var employees = req.body.employees;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    var newCampgrounds = {name:name,image:image,description:desc,employees: employees,author: author};
    Campground.create(newCampgrounds,function(err, newlyCreated){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect('/campgrounds');
        }
    });
    
});

router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new.ejs');
});
router.get("/:id",function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           res.render('campgrounds/show',{campground: foundCampground});
       } 
    });
});

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit", {campground: foundCampground});
            } 
        });
});


router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success","DC removed")
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;