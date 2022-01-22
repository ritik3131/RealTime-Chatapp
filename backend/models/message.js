const mongoose = require("mongoose");

const WhatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

module.exports = mongoose.model("message", WhatsappSchema);
