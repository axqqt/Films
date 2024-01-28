const express = require("express");
const router = express.Router();
const FilmMainController = require("../controllers/FilmMains");
const Search = require("../controllers/SearchTitle");

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
