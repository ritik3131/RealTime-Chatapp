const messageModel = require("../models/message");
const roomModel = require("../models/roomModel");

exports.postMessage = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const messageBody = new messageModel(req.body);
    await messageBody.save();
    const room=await roomModel.findById(roomId);
    room.roomName.messages.unshift(messageBody);
    await room.save();
    res.status(200).json(messageBody);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.getMessage=async(req,res)=>{
    try{
        const message=await messageModel.find();
        res.status(200).json(message);
    }catch{
        console.log(err);
        res.status(500).send(err);
    }
}
