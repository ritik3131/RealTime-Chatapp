const express=require('express');
const { postMessage, getMessage, getOneMessage } = require('../controller/messageController');
const { getCurrentUser } = require('../controller/userController');

const router=express.Router();

router.post('/:roomId/new',postMessage);
router.get('/:roomId/getMessage',getMessage);
router.get('/user',getCurrentUser);
// router.get('/:messageId',getOneMessage);

module.exports=router;