const router = require("express").Router();
const connection = require("../../database/apiConnexion");

console.log("GetUser");

router.post("/", (req, res) => {
  const id = req.body.id;
  console.log(id);

  const sql = `SELECT idUser, Useremail, Username FROM users WHERE idUser=?`;
  const values = [id];
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
