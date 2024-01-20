const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "s3kreee7",
  database: "my_db",
});

module.exports = db;
