const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 20,
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 5,
    },
    trailer: {
      type: String,
      required: true,
      trim: true,
      min: 5,
    },
    category:{
      type:String,
      default:"All"
    },
    comments:{
      type:Array,default:[]  
    },
    photo: {
      type: String,
      unique: true,
      trim: true,
      min: 5,
    },
    video: { type: String, unique: true, trim: true, min: 5 },
    alternate: {
      type: String,
    },
    rating: { type: Number,min:0,max:10 },
    addedBy: {
      type: String, //ID is type String
      ref: "users",
      required:true,
    },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movies", movieSchema);
module.exports = movieModel;
