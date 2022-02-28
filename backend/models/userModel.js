const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mailId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("user", UserSchema);