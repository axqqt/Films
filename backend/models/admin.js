const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 5,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    mail: {
      type: String,
      unique: true,
      required: true,
      min: 5,
      max: 20,
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admins", adminSchema);
module.exports = adminModel;
