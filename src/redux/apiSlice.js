import { createSlice } from "@reduxjs/toolkit";
import SongsAPI from "./apiThunk";

const apiSlice = createSlice({
  name:"songsApi",
  initialState:{
    songs:[],
    loading:false,
    error:null
  },
  reducers:{
  },
  extraReducers:(builder)=>{
    builder
    .addCase(SongsAPI.pending,(state)=>{
      state.loading = true;
      state.error = null; 
    })
    .addCase(SongsAPI.fulfilled,(state,action)=>{
      state.loading = false;
      state.songs = action.payload;
    })
    .addCase(SongsAPI.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.error.message;
    })
  }
})

export default apiSlice.reducer;

