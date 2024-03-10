const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      default: "guest",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      default: "guest123",
    },
    mail: {
      type: String,
      required: true,
      trim: true,
      min: 5,
    },
    comments: {
      type: Array,
      default: [],
      trim: true,
    },
    photo: {
      type: String,
      default:"https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg" //default pfp
    },
    followers:{
      type:Number,
      default:0,
    },
    following:{
      type:Number,
      default:0,
    }
  },
  { timestamps: true }
);

const movieModel = mongoose.model("users", userSchema);
module.exports = movieModel;
