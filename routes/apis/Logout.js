const router = require("express").Router();

router.delete("/", (req, res) => {
  res.clearCookie("token", {
    domain: "(.)backend-zuaq.onrender.com",
    path: "/",
    httpOnly: false,
    sameSite: "none",
    secure: true,     
  });
  console.log("Logout");
  res.end();
});

module.exports = router;
