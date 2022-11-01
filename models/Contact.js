const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pro: {
    type: String,
    required: true,
  },
  collabs: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Contact", ContactSchema);
