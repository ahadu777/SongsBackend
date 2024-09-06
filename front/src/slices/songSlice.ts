// src/slices/songSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Song {
    _id: string; 
    title: string;
    album: string;
    artist: string;
    genre: string;
    createdAt: string;
    updatedAt: string;
}

interface SongState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },
    // updateSong: (state, action: PayloadAction<Song>) => {
    //   const index = state.songs.findIndex(song => song.id === action.payload.id);
    //   if (index !== -1) {
    //     state.songs[index] = action.payload;
    //   }
    // },
    // deleteSong: (state, action: PayloadAction<number>) => {
    //   state.songs = state.songs.filter(song => song.id !== action.payload);
    // },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSong,
//   updateSong,
//   deleteSong,
} = songSlice.actions;

export default songSlice.reducer;
