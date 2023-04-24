const cookieParser = require("cookie-parser");

const connection = require("../../context/apiConnexion");
const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { key, keyPub } = require("../../key");

console.log("Signin");

router.post("/", (req, res) => {
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
        res.cookie("token", token);
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

module.exports = router;
