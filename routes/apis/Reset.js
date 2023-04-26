const connection = require("../../database/apiConnexion");
const jsonwebtoken = require("jsonwebtoken");
const router = require("express").Router();
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
  console.log("id : " + id + " token : " + token);
  try {
    const verify = jsonwebtoken.verify(token, keyPub);
    res.render("index", { email: verify.email });
  } catch (error) {
    res.send("Not Verified");
  }
});

router.post("/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log("id : " + id + " token : " + token);
  try {
    const verify = jsonwebtoken.verify(token, keyPub);
    res.render("index", { email: verify.email });
  } catch (error) {
    res.send("Not Verified");
  }
});

module.exports = router;
