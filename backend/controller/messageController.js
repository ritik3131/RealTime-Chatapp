const messageModel = require("../models/message");

exports.postMessage = async (req, res) => {
  try {
    const messageBody = new messageModel(req.body);
    await messageBody.save();
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
