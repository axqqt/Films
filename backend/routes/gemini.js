const express = require("express");
const router = express.Router();
const GeminiController = require("../controllers/GeminiController");

router.route("/").post(GeminiController.GeminiCall);

module.exports = router;
