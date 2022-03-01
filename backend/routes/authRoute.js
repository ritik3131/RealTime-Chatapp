const express = require("express");
const passport = require("passport");
const { googleLogin } = require("../controller/userController");

const router = express.Router();

router.post("/login",googleLogin);

module.exports = router;
