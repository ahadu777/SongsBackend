// import my model here

const Song = require("./models/songs.model.js");
require('dotenv').config();


const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("listening on port 3001");
});

app.get("/", function (req, res) {
  res.send("songs api home.");
});

app.get("/songs", async function (req, res) {
  const { genre, artist, album } = req.query;
  const filter = {};
  if (genre) filter.genre = genre;
  if (artist) filter.artist = artist;
  if (album) filter.album = album;
  console.log(filter);

  try {
    const songs = await Song.find(filter);
    res.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  //   const allsongs=  await Song.find({})

//   res.json(songs);
});

app.post("/songs", async function (req, res) {
  await Song.create(req.body);
  res.send(req.body);
});

app.put("/songs/:id", async function (req, res) {
  const { id } = req.params;
  const song = await Song.findByIdAndUpdate(id, req.body,{new: true});
  if (!song) {
    res.status(404);
  } else {
    res.json(song);
  }
});

app.delete("/songs/:id", async function (req, res) {
  const { id } = req.params;

  try {
    const result = await Song.deleteOne({ _id: id }); 

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});


app.get("/stats", async function (req, res) {
  try {
    const totalSongs = await Song.countDocuments();

    // Get songs grouped by genre
    const songsByGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { count: -1 } } // Sort by count descending
    ]);

    // Get total artists
    const totalArtists = await Song.distinct("artist").then(artists => artists.length);

    // Calculate average songs per artist
    const averageSongsPerArtist = totalArtists > 0 ? totalSongs / totalArtists : 0;

    // Get the top genre
    const topGenre = songsByGenre.length > 0 ? songsByGenre[0] : null;

    res.json({
      totalSongs,
      songsByGenre,
      totalArtists,
      averageSongsPerArtist,
      topGenre: topGenre ? { genre: topGenre._id, count: topGenre.count } : null
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});






const mongoose = require("mongoose");
mongoose
  .connect(
    process.env.MONGO_CONNECTION_STRING 
  ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((err) => {
    console.log(err);
  }
);
