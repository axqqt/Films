const express = require("express");
const router = express.Router();
const adminMain = require("../../controllers/adminMain");
const adminID = require("../../controllers/adminID");

router.route("/").get(adminMain.admins).post(adminMain.createAdmin);

router
  .route("/:id")
  .delete(adminID.deleteAdmin)
  .put(adminID.updateAdmin)
  .get(adminID.findAdmin);

module.exports = router;
