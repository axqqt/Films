const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const Axios = require("axios");
require("dotenv").config();
const apiKey = process.env.apiKey;

const data = [];

router.route("/").get(userController.GetUsers).post(userController.CreateUser);

router.route("/:id").delete(userController.deleteUser);

router.route("/forgot").post(userController.updatePassword);

router.get("/arg", async (req, res, next) => {
  const { arg } = req?.body;

  try {
    const response = await Axios.get(
      `https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(
        String(arg)
      )}`,
      {
        headers: {
          "X-Api-Key": apiKey,
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
