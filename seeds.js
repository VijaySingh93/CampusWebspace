var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var data = [
    {   name: "Rishikesh",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYLosV3b5wGrgyTBCeg8TwCAU69Va8mZKWR7xuYQM5_TfC4jwlIQ",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{   name: "simla",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR1I3cHJ3concjPAWuU9efcaTVUL9b8Dst4kL3L7jnh79CzO3Q7tw",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },{   name: "Manali",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRjKAL81KAbrM0wZX2FF3HUKJh_kJ95wovDQv6-Dae-Nz4-Ih05",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    ];


function seedDB(){
    Campground.remove({},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("removed Campgrounds");
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err);
            }else{
                console.log("added a campground");
                Comment.create({
                    text:"This place was great except I wished I had friends with me",
                    author:"Vishal"
                }, function(err, comment){
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created new campground");
                    }
                });
        }
    });
});
    }
    
 });


    
}

module.exports = seedDB;

