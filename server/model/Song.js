const mongoose = require("../connection/connection");

const SongSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  song: { type: String, required: true },
  img: { type: String, required: true },
  duration: { type: String, required: true },
});

const Song = mongoose.model(SongSchema);

module.exports = Song;
