const roomModel = require("../models/roomModel");

exports.getOneRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await roomModel
      .findById(roomId)
      .exec()
    const roomDetails= await room.roomName.populate("messages");
    res.status(200).json(roomDetails);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error error in fetching room data");
  }
};

exports.createRoom =async (req, res) => {
  try {
    const roomName = req.body.name;
    const newRoom = new roomModel({
      roomName: {
        name: roomName,
        message: [],
      },
    });
    await newRoom.save();
    res.status(200).json(newRoom); 
  } catch (err) {
    console.log(err);
    res.status(500).send("Error error in creating room");
  }
};

exports.getAllRoom =async (req, res) => {
  try {
    const roomDetails = await roomModel.find({}).exec();
    res.status(200).json(roomDetails);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error error in fetching room data");
  }
};
