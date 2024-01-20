const express = require("express");
const router = express.Router();
const FilmMainController = require("../controllers/FilmMains");
const Search = require("../controllers/SearchTitle");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .route("/")
  .get(FilmMainController.GetFilms)
  .post(FilmMainController.CreateFilms);

router.route("/:title").get(Search.SearchByTitle);
router
  .route("/:id")
  .post(Search.IDWise)
  .delete(Search.DeleteItems)
  .put(Search.UpdateFilm);

module.exports = router;
