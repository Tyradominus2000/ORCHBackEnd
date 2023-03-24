const bodyparser = require("body-parser");
const express = require("express");
const mysql = require("mysql");

const app = express();
const http = require("http");
const port = 8000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ORCH",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté a la base de donnée");
});

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.listen(port, () => {
  console.log(`Server Node écoutant sur le port ${port}`);
});
