const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const CartID = require("../controllers/CartIDWise");

router.route("/").get(CartController.GetCart).post(CartController.CreateItem);

router.route("/:id").post(CartID.PlaceOrder).delete(CartID.deleteItem);

module.exports = router;
