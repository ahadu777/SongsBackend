const mongoose = require('mongoose');

const SongsSchema=mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    album: {
        type: 'string',
        required: true
    },
    artist: {
        type: 'string',
        required: true
    },
    genre: {
        type: 'string',
        required: true
    },
}, {timestamps: true})

const Song = mongoose.model('Song',SongsSchema);

module.exports =Song;