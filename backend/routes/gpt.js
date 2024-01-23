const express = require("express");
const router = express.Router();

const images = require("../controllers/gptImages");

router.route("/").post(images.generateImages);

module.exports = router;
