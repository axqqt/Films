const express = require("express");
const router = express.Router();
const db = require("../config/sqlConfig");

router
  .route("/")
  .get((req, res) => {
    const query = `SELECT * FROM users`;
    db.query(query, (err, data) => {
      if (err) throw err;
      res.json(data).status(200);
    });
  })
  .post(async (req, res) => {
    const { username, password } = req?.body;

    const query = `INSERT INTO users ${(username, password)}`;

    db.query(query, (err) => {
      if (err) throw err;
      return res.status(201).json({ Alert: `Created user with ${username}` });
    });
  })
  .put((req, res) => {
    const { username, password } = req?.body;
    const query = ` UPDATE users SET ${username},${password} `;
    db.query(query, (err) => {
      if (err) throw err;
      return res.status(200).json({ Alert: `Updated!` });
    });
  })
  .delete((req, res) => {
    const { username } = req?.body;
    const query = `DELETE FROM users WHERE username=${username}`;
    db.query(query, (err) => {
      if (err) throw err;
      return res.status(200).json({ Alert: `Updated!` });
    });
  });

module.exports = router;
