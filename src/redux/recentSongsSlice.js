import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // ← .env se lo

// Fetch recent songs for logged-in user
export const fetchRecentSongs = createAsyncThunk(
  "recentSongs/fetch",
  async () => {
    const res = await axios.get(`${API}recent-songs`, { withCredentials: true });
    return res.data.data; // array of song titles
  }
);

// Add a song and sync with DB
export const addRecentSongToDB = createAsyncThunk(
  "recentSongs/add",
  async (songData) => {   // ← songTitle ki jagah songData object
    const res = await axios.post(
      `${API}recent-songs`,
      { title: songData.title, poster: songData.poster },  // ← dono bhejo
      { withCredentials: true }
    );
    return res.data.data;
  }
);

const recentSongsSlice = createSlice({
  name: "recentSongs",
  initialState: {
    songs: [],
    loading: false,
  },
  reducers: {
    clearRecentSongs: (state) => {
      state.songs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentSongs.fulfilled, (state, action) => {
        state.songs = action.payload;
      })
      .addCase(addRecentSongToDB.fulfilled, (state, action) => {
        state.songs = action.payload; // DB always returns updated array
      });
  },
});

export const { clearRecentSongs } = recentSongsSlice.actions;
export default recentSongsSlice.reducer;