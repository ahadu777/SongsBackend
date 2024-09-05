// import my model here

const Song = require('./models/songs.model.js');

const express= require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(3000,()=>{
    console.log('listening on port 3000');
});

app.get('/', function(req, res){
res.send("songs api home.")
});

app.get('/songs', async function(req, res){
  const allsongs=  await Song.find({})

  res.json(allsongs)
});

app.post('/songs', async function(req, res){
await Song.create(req.body);
res.send(req.body);
});

app.put('/songs/:id', async function(req, res){
    const {id} = req.params;
    const song= await Song.findByIdAndUpdate(id,req.body);
    if(!song){
        res.status(404);
    }
    else{
        res.json(song);
    }
});


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ahadu4321:admin@songscluster.soce6.mongodb.net/Songs?retryWrites=true&w=majority&appName=SongsCluster').
then(()=>{
    console.log('mongo db connected');
}).catch(err=>{
    console.log(err);
});