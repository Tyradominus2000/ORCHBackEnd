const connection = require("../../database/apiConnexion");
const jsonwebtoken = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { key, keyPub } = require("../../key");

router.post("/", (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    const sql = `SELECT * FROM users WHERE Useremail= "${email}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result[0]) {
        const token = jsonwebtoken.sign(
          { email: result[0].Useremail, id: result[0].idUser },
          key,
          {
            expiresIn: "5m",
            algorithm: "RS256",
          }
        );
        const link = `http://localhost:8000/apis/Reset/${result[0].idUser}/${token}`;
        console.log(link);
        res.send(JSON.stringify(link));
      } else {
        res.send(JSON.stringify(false));
      }
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  // console.log("id : " + id + " token : " + token);
  try {
    const verify = jsonwebtoken.verify(token, keyPub);
    res.render("index", { email: verify.email, status: false, same: false });
  } catch (error) {
    res.send("Not Verified");
  }
});

router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log(password);
  console.log(req.body);
  const sql = `SELECT * FROM users WHERE idUser = "${id}"`;
  connection.query(sql, async (err, result) => {
    if (err) throw err;
    if (result[0]) {
      try {
        const Userpassword = await bcrypt.hash(password, saltRounds);
        const verify = jsonwebtoken.verify(token, keyPub);
        const same = bcrypt.compareSync(password, result[0].Userpassword);
        if (same) {
          res.render("index", {
            email: verify.email,
            status: false,
            same: true,
          });
        } else {
          const sql = `UPDATE users SET Userpassword = "${Userpassword}" WHERE idUser = "${id}"`;
          connection.query(sql, (err, result) => {
            if (err) throw err;
            res.render("index", {
              email: verify.email,
              status: true,
              same: false,
            });
          });
        }
      } catch (error) {
        console.log(error);
        res.send(JSON.stringify(false));
      }
    } else {
      res.send(JSON.stringify(false));
    }
  });
});

module.exports = router;
