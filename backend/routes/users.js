const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const Axios = require("axios");
require("dotenv").config();
const apiKey = process.env.api_key;

// checkSchema({
//   username: {
//     errorMessage: 'Invalid username',
//     isEmail: true,
//   },
//   password: {
//     isLength: {
//       options: { min: 8 },
//       errorMessage: 'Password should be at least 8 chars',
//     },
//   },
// });

router.route("/").get(userController.GetUsers).post(userController.CreateUser);

router.route("/:id").get(userController.userSpecific).delete(userController.deleteUser);

router.route("/forgot").post(userController.updatePassword);

router.get("/arg", async (req, res, next) => { //JUST INCLUDED THIS FOR FUN
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
