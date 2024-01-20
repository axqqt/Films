const mongoose = require("mongoose");
const userCart = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
      min: 5,
    },
    itemDescription: {
      type: String,
      required: true,
      trim: true,
    },
    itemQuantity: {
      type: Number,
      required: true,
      trim: true,
    },
    itemAvailability: {
      type: Boolean,
      default: true,
      trim: true,
    },
    itemPhoto: {
      type: String,
      trim: true,
    },
    payment: {
      type: String,
      required: true,
      unique: true,
    },
    userOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserOrder",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("items", userCart);
module.exports = userModel;
