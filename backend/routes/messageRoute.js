const express=require('express');
const { postMessage, getMessage } = require('../controller/messageController');

const router=express.Router();

router.post('/new',postMessage);
router.get('/getMessage',getMessage);

module.exports=router;