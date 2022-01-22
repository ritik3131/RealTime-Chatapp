const express=require('express');
const { postMessage, getMessage, getOneMessage } = require('../controller/messageController');

const router=express.Router();

router.post('/:roomId/new',postMessage);
router.get('/:roomId/getMessage',getMessage);
// router.get('/:messageId',getOneMessage);

module.exports=router;