import { createSlice } from "@reduxjs/toolkit";

const songTitleSlice = createSlice({
  name:"songTitle",
  initialState:{
    song:""
  },
  reducers:{
    setSongTitle:(state,action)=>{
      state.song = action.payload;
    },
    clearSongTitle:(state)=>{
      state.song = "";
    }
  }
})

export const {setSongTitle,clearSongTitle} = songTitleSlice.actions;

export default songTitleSlice.reducer;