import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Song {
    _id?: string | null; 
    title: string;
    album: string;
    artist: string;
    genre: string;
    // createdAt: string | null;
    // updatedAt: string | null;
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
    addSongRequest(state, action: PayloadAction<Song>) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      state.songs.push(action.payload); // Add the new song to the list
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload ;
    } ,
    deleteSongRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.songs = state.songs.filter(song => song._id !== action.payload);
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongRequest(state, action: PayloadAction<{ id: string; song: Song }>) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      const index = state.songs.findIndex(song => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload; // Update the song in the list
      }
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequest, 
  addSongSuccess, 
  addSongFailure ,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
} = songSlice.actions;

export default songSlice.reducer;
