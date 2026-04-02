import { configureStore } from "@reduxjs/toolkit";
import SongApiReducer from "./apiSlice";
import recentSongsReducer from "./recentSongsSlice";  // ← ye add karo
import playlistReducer from "./playlistSlice"
import userReducer from "./userSlice";
import songReducer from "./songTitleSlice"

const store = configureStore({
  reducer: {
    songsApi: SongApiReducer,
    recentSongs: recentSongsReducer,  // ← ye add karo
    playlist:playlistReducer,
    user:userReducer,
    songTitle:songReducer
  },
});

export default store;