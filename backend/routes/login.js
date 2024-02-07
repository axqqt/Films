const express = require("express");
const router = express.Router();
const loginController = require("../controllers/LoginController");
const discordHandler = require("../security/discordAuth");
const passport = require("passport");


router.route("/").post(loginController.Login);

router.route("/discord").get(passport.authenticate("discord"));

router.route("/status").post(loginController.status);

router.route("/logout").post(loginController.logout);

module.exports = router;
