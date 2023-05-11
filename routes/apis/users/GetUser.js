const router = require("express").Router();
const connection = require("../../../database/apiConnexion");

console.log("GetUser");

router.post("/", (req, res) => {
  const email = req.body.value;
  console.log(email);

  const sql = `SELECT * FROM users WHERE Useremail=?`;
  const values = email;
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    if (result[0]) {
      res.send(JSON.stringify(true));
    } else {
      res.send(JSON.stringify(false));
    }
  });
});

module.exports = router;
