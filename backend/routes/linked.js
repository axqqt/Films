const express = require("express");
const router = express.Router();
const mediaModel = require("../models/media");

router.route("/:id").post(async (req, res) => {
  const { id } = req?.params;
  const convertedID = String(id);
  if (!id) return res.status(400).json({ Alert: "No ID Provided" });

  const findByID = await mediaModel.findById({ _id: convertedID });
  if (!findByID) {
    return res.status(404).json({ Alert: "No responses for that ID" });
  } else {
    return res.status(200).json(findByID);
  }
});

module.exports = router;
