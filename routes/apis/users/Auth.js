const router = require("express").Router();
const connection = require("../../../database/apiConnexion");
const { key, keyPub } = require("../../../key");
const jsonwebtoken = require("jsonwebtoken");

router.get("/", async (req, res) => {
  console.log("In Auth");
  const { token } = req.cookies;
  console.log("Cookies " + token);
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub);
      console.log({ decodedToken });
      const sql = `SELECT * from users WHERE idUser="${decodedToken.sub}"`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        if (result[0]) {
          delete result[0].Userpassword;
          res.send(result);
        } else {
          res.send(false);
        }
      });
    } catch (error) {
      console.error(error);
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

module.exports = router;
