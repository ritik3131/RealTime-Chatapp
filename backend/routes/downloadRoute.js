const express = require("express");
const getFile = require("../controller/downloadController");

const fs = require('fs')

const { getCurrentUser } = require("../controller/userController");
const { response } = require("express");

let fileType = "image";



const Router = express.Router();


Router.get("/:dirname/:filename", (req,res,next)=>{
    next();    
} ,getFile);
// router.get('/:messageId',getOneMessage);

module.exports = Router;
