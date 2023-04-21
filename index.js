const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const saltRounds = 10;
const port = 8000;

const { key, keyPub } = require("./key");

const http = require("http");

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

connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté a la base de donnée");
});

app.use(bodyparser.json());

app.use(cookieParser());

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

app.post("/Signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);

  const sql = `SELECT * FROM users WHERE Useremail=?`;
  const values = [email];

  connection.query(sql, values, async (err, result) => {
    if (err) throw err;
    console.log(result[0]);
    if (result[0] != null) {
      if (bcrypt.compareSync(password, result[0].Userpassword)) {
        console.log(result[0].idUser.toString());
        const token = jsonwebtoken.sign({}, key, {
          subject: result[0].idUser.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });
        console.log(token);
        res.cookie("token", token, {secure: false, sameSite: "none" , httpOnly: false});
        res.json(result[0]);
      } else {
        console.log("Wrong password or Email");
        res.send(JSON.stringify(false));
      }
    } else {
      console.log("Wrong password or Email");
      res.send(JSON.stringify(false));
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

app.post("/UploadPP", (req, res) => {
  console.log("req.body " + req.body);
  res.send(true);
});

app.get("/GetComponent", (req, res) => {
  sql = "SELECT * from component";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(JSON.stringify(result));
  });
});

app.get("/GetComponent/:component", (req, res) => {
  const component = req.params.component;
  let sql = "";
  switch (component) {
    case "CPU":
      sql = "SELECT * FROM component_cpu";
      break;

    case "GPU":
      sql = "SELECT * FROM component_gpu";
      break;
    case "MB":
      sql = "SELECT * FROM component_motherboard";
      break;
    default:
      sql = `SELECT *
      FROM component_cpu
      JOIN component_gpu ON component_cpu.idComponent = component_gpu.idComponent
      JOIN component_motherboard ON component_cpu.idComponent = component_motherboard.idComponent
      WHERE component_cpu.idComponent = (SELECT idComponent FROM component WHERE ComponentName = "${component}")`;
  }
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Liste " + component + " récupéré");
    res.send(JSON.stringify(result));
  });
});

app.get("*", (req, res) => {
  res.send(JSON.stringify("API working"));
});

app.listen(port, () => {
  console.log(`Server Node écoutant sur le port ${port}`);
});
