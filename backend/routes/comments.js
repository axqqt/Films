const express = require("express");
const router = express.Router();
const userModel = require("../models/media");

router
  .route("/")
  .get(async (req, res) => {
    if (req.session.user) {
      try {
        const comments = await userModel
          .find({ comments }) 
          .populate("by"); 
        return res.status(200).json(comments);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      try {
        const comments = await userModel.find();
        return res.status(200).json(comments);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
})


  router.route("/:id").post(async (req, res) => {
    const id = req?.params?.id;
    if(!id ) res.status(400).json({Alert:"ID missing!"})
    const comment = req?.body?.comment;

    if (!comment || comment.length < 5) {
      return res
        .status(422)
        .json({ Alert: "Comment should be at least 5 characters long." });
    }

    try {
      const exists = await userModel.findOne({ comment, by: id });

      if (!exists) {
        const newComment = await userModel.create({
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
  }).delete(async (req,res)=>{
    if(req.session.user){
      const findUser = await userModel.findOne({username:req.session.user.username})
      if(!findUser){
        res.status(400).json({Alert:"Invalid Username!"})
      }else{
        const deleted = await findUser.deleteOne();
        if(!deleted){
          res.status(403).json({Alert:"Error while deleting!"})
        }else{
          res.status(200).json({Alert:"Deleted!"})
        }
      }
    }
  });
  

module.exports = router;
