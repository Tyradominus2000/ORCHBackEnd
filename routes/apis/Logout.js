const router = require("express").Router();

router.delete("/", (req, res) => {
  res.clearCookie("token");
  console.log("Logout");
  res.end();
});

module.exports = router;
