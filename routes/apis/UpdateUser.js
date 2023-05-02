const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../key");

const connection = require("../../database/apiConnexion");

router.post("/", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;

  const { token } = req.cookies;
  console.log(token);
  const password = req.body.password;

  if (token) {
    const decodedToken = jsonwebtoken.verify(token, keyPub);

    const sql = `SELECT * FROM users WHERE idUser = "${decodedToken.sub}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result[0]) {
        if (!username) {
          username = result[0].Username;
        }
        if (!email) {
          email = result[0].Useremail;
        }
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(result[0].Userpassword);
        if (bcrypt.compareSync(password, result[0].Userpassword)) {
          const sql = `UPDATE users SET Username = "${username}", Useremail = "${email}" WHERE idUser = "${result[0].idUser}"`;
          connection.query(sql, (err, result) => {
            if (err) throw err;
            res.send(JSON.stringify(true));
          });
        } else {
          res.send(JSON.stringify("Invalid"));
        }
        console.log("1");
      } else {
        res.send(JSON.stringify(false));
        console.log("2");
      }
    });
  } else {
    console.log("3");
    res.send(JSON.stringify(false));
  }
});

module.exports = router;
