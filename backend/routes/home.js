const express = require("express");
const router = express.Router();
const FilmMainController = require("../controllers/FilmMains");
const Search = require("../controllers/SearchTitle");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'backend/routes/uploads'));
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage: storage });

router
  .route("/")
  .get(FilmMainController.GetFilms)
  .post(upload.single("file"), FilmMainController.CreateFilms);


router.route("/:searchTerm").get(Search.SearchByTitle);
router
  .route("/:id")
  .post(Search.IDWise)
  .delete(Search.DeleteItems)
  .put(Search.UpdateFilm);

router.route("/:searchTerm").get(Search.SearchByTitle);

module.exports = router;
