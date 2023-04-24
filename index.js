const express = require("express");
//Dépendance pour gérer les cookies
const cookieParser = require("cookie-parser");

//Initialisation de l'APP
const app = express();
const routes = require("./routes");
const mysql = require("mysql");
// const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
// const jsonwebtoken = require("jsonwebtoken");
// const saltRounds = 10;
const connection = require("./context/apiConnexion");
const port = 8000;

// const { key, keyPub } = require("./key");

const http = require("http");


connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté a la base de donnée");
});


app.use(bodyparser.json());
//middleware pour extraire les cookies
app.use(cookieParser());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

/*AddUser
// app.post("/AddUser", (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   //hash the password
//   bcrypt.hash(password, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
//     if (err) throw err;
//     const sql = `INSERT INTO users (Username, Useremail, Userpassword) VALUES ( ?, ?, ?)`;
//     const values = [username, email, hash];
//     connection.query(sql, values, (err, result) => {
//       if (err) throw err;
//       console.log("Utilisateur ajouté à la base de données");
//       res.send(JSON.stringify(true));
//     });
//   });
// });
*/

/*SignIn
// app.post("/Signin", (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(email);
//   console.log(password);

//   const sql = `SELECT * FROM users WHERE Useremail=?`;
//   const values = [email];

//   connection.query(sql, values, async (err, result) => {
//     if (err) throw err;
//     console.log(result[0]);
//     if (result[0] != null) {
//       if (bcrypt.compareSync(password, result[0].Userpassword)) {
//         console.log(result[0].idUser.toString());
//         const token = jsonwebtoken.sign({}, key, {
//           subject: result[0].idUser.toString(),
//           expiresIn: 3600 * 24 * 30 * 6,
//           algorithm: "RS256",
//         });
//         console.log(token);
//         res.cookie("token", token, {
//           secure: true,
//           sameSite: "none",
//         });
//         res.json(result[0]);
//       } else {
//         console.log("Wrong password or Email");
//         res.send(JSON.stringify(false));
//       }
//     } else {
//       console.log("Wrong password or Email");
//       res.send(JSON.stringify(false));
//     }
//   });
// });
*/

/*GetUser
// app.post("/GetUser", (req, res) => {
//   const id = req.body.id;
//   console.log(id);

//   const sql = `SELECT idUser, Useremail, Username FROM users WHERE idUser=?`;
//   const values = [id];
//   connection.query(sql, values, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });
*/

/*GetComponent
// app.get("/GetComponent", (req, res) => {
//   sql = "SELECT * from component";
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     // console.log(result);
//     res.send(JSON.stringify(result));
//   });
// });

// app.get("/GetComponent/:component", (req, res) => {
//   const component = req.params.component;
//   let sql = "";
//   switch (component) {
//     case "CPU":
//       sql = "SELECT * FROM component_cpu";
//       break;

//     case "GPU":
//       sql = "SELECT * FROM component_gpu";
//       break;
//     case "MB":
//       sql = "SELECT * FROM component_motherboard";
//       break;
//     default:
//       let sqlDefault = `SELECT * FROM component`;
//       connection.query(sqlDefault, (err, result) => {
//         if (err) throw err;
//         let valid = [{}];
//         let i = 0;
//         let resultDefault = [];
//         result.map((r) => {
//           if (r.ComponentName.startsWith(component)) {
//             valid[i] = { id: r.idComponent, type: r.ComponentType };
//             i++;
//           }
//         });
//         console.log(valid);
//         let sqlSwitch;
//         valid.map((v) => {
//           switch (v.type) {
//             case "CPU":
//               sqlSwitch = `SELECT * from component_cpu WHERE idComponent="${v.id}"`;
//               break;
//             case "MB":
//               sqlSwitch = `SELECT * from component_motherboard WHERE idComponent="${v.id}"`;
//               break;
//             case "GPU":
//               sqlSwitch = `SELECT * from component_gpu WHERE idComponent="${v.id}"`;
//               break;
//             default:
//           }
//           connection.query(sqlSwitch, (err, result) => {
//             if (err) throw err;
//             resultDefault[i] = result;
//           });
//         });
//         console.log(result);
//       });
//   }
//   if (sql) {
//     connection.query(sql, (err, result) => {
//       if (err) throw err;
//       console.log("Liste " + component + " récupéré");
//       console.log("Result" + result);
//       res.send(JSON.stringify(result));
//     });
//   }
// });
*/

// app.get("*", (req, res) => {
//   res.send(JSON.stringify("API working"));
// });

/*UploadPP
app.post("/UploadPP", (req, res) => {
  console.log("req.body " + req.body);
  res.send(true);
});
*/

app.use(routes);

app.use("*", (res, req) => {
  res.send(404).end();
});

app.listen(port, () => {
  console.log(`Server Node écoutant sur le port ${port}`);
});
