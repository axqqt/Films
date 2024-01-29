const mongoose = require("mongoose");
const userCartSent = new mongoose.Schema(
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
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const UserOrder = mongoose.model("orders", userCartSent);
module.exports = UserOrder;
