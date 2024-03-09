const express = require("express");
const router = express.Router();
const { youtube } = require("scrape-youtube");

router.route("/").post(async (req, res) => {
  const prompt = req?.body?.thePrompt;
  if (!prompt) return res.status(400).json({ Alert: "No search!" });

  try {
    const results = await youtube.search(prompt);
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ Alert: "No results found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Alert: "Internal server error" });
  }
});

module.exports = router;
