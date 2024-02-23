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
    comments:{
      type:String,  
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
    rating: { type: Number,min:0 },
    addedBy: {
      type: String, //ID is type String
      ref: "users",
    },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movies", movieSchema);
module.exports = movieModel;
