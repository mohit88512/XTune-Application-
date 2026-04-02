import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL; // ← .env se lo

// Playlist fetch karo
export const fetchPlaylist = createAsyncThunk("playlist/fetch", async () => {
  const res = await axios.get(`${API}playlist`, { withCredentials: true });
  return res.data.data;
});

// Song add karo
export const addToPlaylistDB = createAsyncThunk("playlist/add", async (songData) => {
  const res = await axios.post(
    `${API}playlist/add`,
    { title: songData.title, poster: songData.poster },
    { withCredentials: true }
  );
  return res.data.data;
});

// Song remove karo
export const removeFromPlaylistDB = createAsyncThunk("playlist/remove", async (title) => {
  const res = await axios.post(
    `${API}playlist/remove`,
    { title },
    { withCredentials: true }
  );
  return res.data.data;
});

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    songs: [],
    loading: false,
  },
  reducers: {
    clearPlaylist: (state) => {
      state.songs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        state.songs = action.payload || [];
      })
      .addCase(addToPlaylistDB.fulfilled, (state, action) => {
        state.songs = action.payload || [];
      })
      .addCase(removeFromPlaylistDB.fulfilled, (state, action) => {
        state.songs = action.payload || [];
      });
  },
});

export const { clearPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;