const mongoose = require('mongoose');

const greetingSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  dateSent: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Greeting', greetingSchema);
