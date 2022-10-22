const messageModel = require("../models/message");
const roomModel = require("../models/roomModel");

exports.postMessage = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const messageBody = new messageModel(req.body);
        await messageBody.save();
        const room = await roomModel.findById(roomId);
        console.log(roomId);
        room.roomName.messages.push(messageBody);
        await room.save();
        res.status(200).json(messageBody);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

exports.uploadFile = async (req, res) => {
    try {
        console.log("backend:", req.file.filename);
        const roomId = req.params.roomId;
        console.log("bodyIs", req.body);
        let body = req.body;
        body.message = req.file.filename;
        body.downloadURL = `/api/v1/download/${req.file.fieldname}/${req.file.filename}`;
        body.name = req.body.name;

        body.timestamp = req.body.timestamp;

        body.received = req.body.received;

        const messageBody = new messageModel(body);

        await messageBody.save();
        const room = await roomModel.findById(roomId);
        room.roomName.messages.push(messageBody);
        await room.save();

        res.status(200).json(`File Uploaded `);
    } catch (err) {}
};

exports.getMessage = async (req, res) => {
    try {
        const message = await messageModel.find();
        res.status(200).json(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
exports.getOneMessage = async (req, res) => {
    try {
        const message = await messageModel.find(req.params.messageId);
        res.status(200).json(message);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
