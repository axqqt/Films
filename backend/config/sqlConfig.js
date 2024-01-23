const mysql = require("mysql");
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  },
  (err, data) => {
    if (err) throw err;

    console.log(data);
  }
);

module.exports = db;
