const express = require("express");
const router = express.Router();

const authUsers = require("../controller3/authusers.controller");
 
router.post("/register", authUsers.register);
router.post("/login", authUsers.login);
router.post("/forgotpassword", authUsers.forgotPassword);

module.exports = router;