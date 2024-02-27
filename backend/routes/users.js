const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });


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

router.route("/").get(userController.GetUsers).post( upload.single("image"),userController.CreateUser);

router.route("/:id").delete(userController.deleteUser);
router.route("/specific").post(userController.userSpecific).put(userController.increaseFollowers)
router.route("/forgot").post(userController.updatePassword);
router.route("/social").put(userController.followed).post(userController.unfollowed)

module.exports = router;
