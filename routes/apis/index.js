const router = require("express").Router();
const apiSignin = require("./Signin");
const apiAddUser = require("./AddUser");
const apiGetUser = require("./GetUser");

router.use("/Signin", apiSignin);
router.use("/AddUser", apiAddUser);
router.user("/GetUser", apiGetUser);

router.get("/", (req, res) => {
  res.send(JSON.stringify("API working"));
});

module.exports = router;
