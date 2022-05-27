const mongoose = require("../connection/connection");

const PlaylistSchema = new mongoose.Schema({
  name: {
    name: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true },
    desc: String,
    songs: { type: String, default: [] },
    img: String,
  },
});

const Playlist = mongoose.model(PlaylistSchema);

module.exports = Playlist;
