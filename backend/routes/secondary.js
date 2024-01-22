const express = require("express");
const router = express.Router();
const db = require("../config/sqlConfig");

router
  .route("/")
  .get((req, res) => {
    const query = `SELECT * FROM departments`;
    db.query(query, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json(data);
    });
  })
  .post((req, res) => {
    const { username, password } = req.body;

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.query(query, [username, password], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({ Alert: `Created user with ${username}` });
    });
  })
  .put((req, res) => {
    const { username, password } = req.body;
    const query = `UPDATE users SET password = ? WHERE username = ?`;
    db.query(query, [password, username], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ Alert: `Updated!` });
    });
  })
  .delete((req, res) => {
    const { username } = req.body;
    const query = `DELETE FROM users WHERE username = ?`;
    db.query(query, [username], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ Alert: `Deleted user with ${username}` });
    });
  });

router.route("/:id").get((req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ Alert: "No ID" });
  }

  const query = `SELECT * FROM users WHERE id = ?`;
  db.query(query, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
});

module.exports = router;
