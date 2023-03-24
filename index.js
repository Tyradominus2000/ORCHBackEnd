const bodyparser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

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

app.post("/AddRegister", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const sql = `SELECT * FROM login WHERE email="${email}"`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      const sql = ` INSERT INTO login (username, email, password) VALUES ( ?, ?, ?)`;
      const values = [username, email, password];

      connection.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Utilisateur ajouté à la base de données");
        res.send(JSON.stringify(true));
      });
    } else {
      console.log("Utilisateur existant");
      res.send(JSON.stringify(false));
    }
  });
});

app.listen(port, () => {
  console.log(`Server Node écoutant sur le port ${port}`);
});
