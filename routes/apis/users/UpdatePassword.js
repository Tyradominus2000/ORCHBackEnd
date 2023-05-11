const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../../key");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const connection = require("../../../database/apiConnexion");

router.post("/", (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  console.log(newPassword);
  console.log(password);

  if (token) {
    const decodedToken = jsonwebtoken.verify(token, keyPub);

    const sql = `SELECT * FROM users WHERE idUser = "${decodedToken.sub}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result[0]) {
        console.log(password);
        console.log(result[0].Userpassword);
        if (bcrypt.compareSync(password, result[0].Userpassword)) {
          bcrypt.hash(newPassword, saltRounds, function (err, hash) {
            if (err) throw err;;
            const sql = `UPDATE users SET Userpassword = "${hash}" WHERE idUser = "${result[0].idUser}"`;
            connection.query(sql, (err, result) => {
              if (err) throw err;
              res.send(JSON.stringify(true));
            });
          });
        } else {
          res.send(JSON.stringify("Invalid"));
        }
      } else {
        res.send(JSON.stringify(false));
      }
    });
  } else {
    res.send(JSON.stringify(false));
  }
});

module.exports = router;
