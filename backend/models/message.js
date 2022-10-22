const mongoose = require("mongoose");

const WhatsappSchema = mongoose.Schema({
    message: String,
    name: String,
	downloadURL: String,
    timestamp: String,
    received: Boolean,
});

module.exports = mongoose.model("message", WhatsappSchema);
