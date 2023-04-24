const router = require("express").Router();
const apiSignin = require("./Signin");
const apiAddUser = require("./AddUser");
const apiGetUser = require("./GetUser");
const apiGetComponent = require("./GetComponent");
const apiAuth = require("./Auth");

router.use("/Signin", apiSignin);
router.use("/AddUser", apiAddUser);
router.use("/GetUser", apiGetUser);
router.use("/GetComponent", apiGetComponent);
router.use("/Auth", apiAuth);

router.get("/", (req, res) => {
  res.send(JSON.stringify("API working"));
});

console.log("Router");

module.exports = router;
