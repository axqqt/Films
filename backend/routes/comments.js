const express = require("express");
const router = express.Router();
const commentModel = require("../models/comments");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const comments = await commentModel.find().populate();
      return res.status(200).json(comments);
    } catch (err) {
      console.error(err);
    }
  })
  .post(async (req, res) => {
    const id = req?.params?.id;
    const comment = req?.body?.comment;

    if (!comment || comment.length < 5) {
      return res
        .status(422)
        .json({ Alert: "Comment should be at least 5 characters long." });
    }

    try {
      const exists = await commentModel.findOne({ comment, by: id });

      if (!exists) {
        const newComment = await commentModel.create({
          comment,
          by: id,
        });

        if (!newComment) {
          return res
            .status(500)
            .json({ Alert: "Something went wrong while posting comment!" });
        }

        return res
          .status(201)
          .json({ Success: "Comment posted successfully!" });
      } else {
        return res.status(400).json({ Alert: "Comment already exists!" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Alert: "Internal Server Error" });
    }
  });

module.exports = router;
