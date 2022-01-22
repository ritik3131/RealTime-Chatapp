const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = Schema({
  roomName: {
    name: String,
    messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
  },
});

module.exports = mongoose.model("room", RoomSchema);
