const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  //basics
  title: {
    type: String,
    required: true,
    trim: true,
  },
  composer: {
    type: String,
    required: false,
  },
  lyrics: {
    type: String,
    required: false,
  },
  songFileName: {
    type: String,
    required: false,
  },
  songFile: {
    type: String,
    required: false,
  },
  splitFile: {
    type: String,
    required: false,
  },
  pubFile: {
    type: String,
    required: false,
  },
  //metaData
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
  //cowriter
  coWriter: {
    type: String,
    required: false,
  },
  writerSplit: {
    type: String,
    required: false,
  },
  coWriterIpi: {
    type: String,
    required: false,
  },
  //rights
  affiliation: {
    type: String,
    required: false,
  },
  workNum: {
    type: String,
    required: false,
  },
  registered: {
    type: String,
    required: false,
  },
  iswc: {
    type: String,
    required: false,
  },
  ipi:{
    type: String,
    required: false,
  },
  shares: {
    type: String,
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  pubAffiliation: {
    type: String,
    required: false,
  },
  pubShares: {
    type: String,
    required: false,
  },
  pubIpi: {
    type: String,
    required: false,
  },
  //app use
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Song", SongSchema);
