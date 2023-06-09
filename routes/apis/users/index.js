const router = require("express").Router();

const apiSignin = require("./Signin");
const apiAddUser = require("./AddUser");
const apiGetUser = require("./GetUser");
const apiAuth = require("./Auth");
const apiLogout = require("./Logout");
const apiReset = require("./Reset");
const apiUpdateUser = require("./UpdateUser");
const apiUpdatePassword = require("./UpdatePassword");
const apiUploadPP = require("./UploadPP");

router.use("/Signin", apiSignin);
router.use("/AddUser", apiAddUser);
router.use("/GetUser", apiGetUser);
router.use("/Auth", apiAuth);
router.use("/Logout", apiLogout);
router.use("/Reset", apiReset);
router.use("/UpdateUser", apiUpdateUser);
router.use("/UpdatePassword", apiUpdatePassword);
router.use("/UploadPP", apiUploadPP);

module.exports = router;
