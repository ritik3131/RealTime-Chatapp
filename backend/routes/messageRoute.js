const express=require('express');
const { postMessage, getMessage } = require('../controller/messageController');

const router=express.Router();

router.post('/:roomId/new',postMessage);
router.get('/:roomId/getMessage',getMessage);

module.exports=router;