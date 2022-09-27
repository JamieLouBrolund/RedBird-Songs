const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  mood: {
    type: String,
    required: false,
  },
  theme: {
    type: String,
    required: false,
  },
  coWriter: {
    type: String,
    required: false,
  },
  writerSplit: {
    type: String,
    required: false,
  },
  pro: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  songLink: {
    type: String,
    required: false,
  },
  songFile: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  // cloudinaryId: {
  //  type: String,
  //  required: true,
  //},
});

module.exports = mongoose.model("Song", SongSchema);
