var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    created_at: { type: Date, default: Date.now },
    employees: Number,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});



campgroundSchema.path('employees').get(function(num) {
  return num;
});

// Setter
campgroundSchema.path('employees').set(function(num) {
  return num;
});

module.exports = mongoose.model("Campground",campgroundSchema);