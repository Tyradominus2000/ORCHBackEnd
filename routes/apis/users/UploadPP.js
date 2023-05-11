const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const connection = require("../../../database/apiConnexion");
const { keyPub } = require("../../../key");

router.post("/", async (req, res) => {
  const { token } = req.cookies;
  console.log(token);
  const image = req.body.value;
  try {
    const decodedToken = jsonwebtoken.verify(token, keyPub);
    console.log({ decodedToken });
    const sql = `UPDATE users SET Userimage="${image}" WHERE idUser="${decodedToken.sub}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(true);
    });
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

module.exports = router;
