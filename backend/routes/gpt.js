const express = require("express");
const router = express.Router();
const images = require("../controllers/gptImages");

router.route("/").post(images.generateImages);
router.route("/stable").post(images.stableDiffusion)

module.exports = router;
