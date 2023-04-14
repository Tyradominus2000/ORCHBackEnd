const bodyparser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
const http = require("http");
const port = 8000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "orchfull",
});
const connection2 = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  user: "sql7611790",
  password: "v9snT4PGhc",
  database: "sql7611790",
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

app.post("/AddUser", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  //hash the password
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) throw err;
    const sql = `INSERT INTO users (Username, Useremail, Userpassword) VALUES ( ?, ?, ?)`;
    const values = [username, email, hash];
    connection.query(sql, values, (err, result) => {
      if (err) throw err;
      console.log("Utilisateur ajouté à la base de données");
      res.send(JSON.stringify(true));
    });
  });
});

app.post("/VerifyUser", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let resultat = {};
  console.log(email);
  console.log(password);

  const sql = `SELECT * FROM users WHERE Useremail=?`;
  const values = [email];
  connection.query(sql, values, async (err, result) => {
    if (err) throw err;
    console.log(result[0]);
    if (result[0] != null) {
      const response = bcrypt.compare(password, result[0].Userpassword);
      console.log(response);
      if (response) {
        console.log("Utilisateur existant");
        resultat.logged = true;
        resultat.id = result[0].idUser;
        res.send(JSON.stringify(resultat));
      } else {
        resultat[0].logged = false;
        resultat[0].mdp = true;
        console.log("Mot de passe incorect");
        res.send(JSON.stringify(resultat));
      }
    } else {
      resultat.logged = false;
      console.log("Utilisateur non existant");
      res.send(JSON.stringify(resultat));
    }
  });
});

app.post("/GetUser", (req, res) => {
  const id = req.body.id;
  console.log(id);

  const sql = `SELECT idUser, Useremail, Username FROM users WHERE idUser=?`;
  const values = [id];
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

app.post("/GetUserEmail", (req, res) => {
  const email = req.body.key;
  console.log(email);

  const sql = `SELECT * FROM users WHERE Useremail=?`;
  const values = [email];
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log(result);
    if (result.length > 0) {
      res.send(JSON.stringify(false));
    } else {
      res.send(JSON.stringify(true));
    }
  });
});

app.post("/UploadPP", (req, res) => {
  console.log("req.body " + req.body);
  res.send(true);
});

app.get("/GetComponent", (req, res)=> {
  sql = "SELECT * from component"
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result)
    res.send(JSON.stringify(result))
  })
})

app.listen(port, () => {
  console.log(`Server Node écoutant sur le port ${port}`);
});
