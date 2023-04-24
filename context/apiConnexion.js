const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "orchfull",
});

const connection2 = mysql.createConnection({
  host: "sql7.freemysqlhosting.net",
  user: "sql7613818",
  password: "mUFaWrJeKn",
  database: "sql7613818",
});

module.exports = connection;
