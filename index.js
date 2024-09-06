// import my model here

const Song = require("./models/songs.model.js");

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
  const song = await Song.findByIdAndUpdate(id, req.body);
  if (!song) {
    res.status(404);
  } else {
    res.json(song);
  }
});

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://ahadu4321:admin@songscluster.soce6.mongodb.net/Songs?retryWrites=true&w=majority&appName=SongsCluster"
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
