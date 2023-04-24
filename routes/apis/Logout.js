const router = require("express").Router();

router.delete("/", (req, res) => {
  res.clearCookie("token", {
    domain: "localhost",
    path: "/",
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });
  console.log("Logout");
  res.end();
});

module.exports = router;
