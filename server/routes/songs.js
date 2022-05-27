const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Song = require("../model/Song");
const validObjectID = require("../middleware/validObjectID");
const auth = require("../middleware/auth");

// get all the songs
router.get("/", async (req, res) => {
  const songs = await Song.find();
  res.status(200).send({ data: songs });
});

// create a new song
router.post("/", async (req, res) => {
  try {
    // user input for the songs
    const { name, artist, genere, song, img, duration } = req.body;

    //validate empty string
    if (!(name && artist && song && img && duration)) {
      res.status(400).send("Please enter all required fields");
    }

    const music = await Song.create({
      name,
      artist,
      genere,
      song,
      img,
      duration,
    });
    //send message user was created
    return res.status(201).json({
      music,
      status: 201,
      message: "Song was created successfully",
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
  }
});

// update a song by id
router.put("/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send({ data: song, message: "Song has been Updated" });
  } catch (error) {
    console.log(error);
  }
});

// delete song by id
router.delete("/:id", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Song has been deleted" });
  } catch (error) {
    console.log(error);
  }
});

// route for liked song
router.put("/likedsong/:id", [validObjectID, auth], async (req, res) => {
  const song = await Song.findById(req.params.id);
  if (!song) {
    res.status(400).send({ message: "Unable to find Song" });
  }

  console.log(req.body.user_id);
  const user = await User.findById(req.user._id);
  console.log(user);
  const indexOfSong = user.likedSongs.indexOf(song._id);

  let msg = "";
  if (indexOfSong == -1) {
    user.likedSongs.push(song._id);
    msg = "Song as been added to LIKED songs";
  } else {
    user.likedSongs.splice(indexOfSong, 1);
    msg = "Song as been removed from LIKED songs";
  }
  console.log(user);
  await user.save();
  res.status(200).json({
    status: 200,
    message: msg,
    requestAt: new Date().toLocaleString(),
  });
});

// show all the liked songs

router.get("/likedsongs/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const songs = await Song.find({ _id: user.likedSongs });
    res.status(200).send({ data: songs });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
