const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    default: "",
    trim: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const commentModel = mongoose.model("comments", commentSchema);
module.exports = commentModel;
