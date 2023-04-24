const router = require("express").Router();
const connection = require("../../context/apiConnexion");
const { key, keyPub } = require("../../key");

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
          return result;
        } else {
          res.status(400).end();
        }
      });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }
});

module.exports = router;
