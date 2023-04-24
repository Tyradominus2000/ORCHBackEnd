const router = require("express").Router();
const apiRouter = require("./apis");

router.use("/apis", apiRouter);

module.exports = router;