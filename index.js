const express = require("express");
//Dépendance pour gérer les cookies
const cookieParser = require("cookie-parser");

//Initialisation de l'APP
const app = express();
const routes = require("./routes");
const bodyparser = require("body-parser");
const connection = require("./database/apiConnexion");
const port = 8000;

// const API_FrontURL = "https://orch-full.vercel.app";
const API_FrontURL = "http://localhost:3000";

const http = require("http");

connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté a la base de donnée");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", API_FrontURL);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//middleware pour extraire les cookies
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(routes);

app.set("view engine", "ejs");

app.use("*", (req, res) => {
  res.status(404).end();
});

app.listen(port, () => {
  console.log(`Server Node écoutant sur le port ${port}`);
});

