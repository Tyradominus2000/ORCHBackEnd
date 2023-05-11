const router = require("express").Router();
const bcrypt = require("bcrypt");
const connection = require("../../../database/apiConnexion");
const saltRounds = 10;

console.log("AddUser");

router.post("/", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const sql = `SELECT * FROM users WHERE Useremail = "${email}"`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
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
    } else {
      res.send(JSON.stringify(false));
    }
  });
});

module.exports = router;
