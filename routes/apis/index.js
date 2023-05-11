const router = require("express").Router();

const apiUser = require("./users");
const apiCompo = require("./compo");

router.use("/users", apiUser);
router.use("/compo", apiCompo);

router.get("/", (req, res) => {
  res.send(JSON.stringify("API working"));
});

console.log("Router");

module.exports = router;
