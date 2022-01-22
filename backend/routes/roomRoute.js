const express=require('express');
const { createRoom, getOneRoom, getAllRoom } = require('../controller/roomController');

const router=express.Router();

router.post('/new',createRoom);
router.get('/:roomId',getOneRoom);
router.get('/',getAllRoom);

module.exports=router;