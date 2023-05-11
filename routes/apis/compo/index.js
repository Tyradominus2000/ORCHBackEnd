const router = require("express").Router();

const apiGetComponent = require("./GetComponent");
const apiSendReport = require("./SendReport");

router.use("/GetComponent", apiGetComponent);
router.use("/SendReport", apiSendReport);

module.exports = router;
