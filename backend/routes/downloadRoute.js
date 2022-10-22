const express = require("express");
const {
    getFile
} = require("../controller/downloadController");

const fs = require('fs')

const { getCurrentUser } = require("../controller/userController");
const {response} = require("express");

let fileType = "image";



const router = express.Router();


router.get("/", getFile);
// router.get('/:messageId',getOneMessage);

module.exports = router;
