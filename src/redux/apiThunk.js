import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL; // ← .env se lo

const SongsAPI = createAsyncThunk('songs/fetchSongs',
  async(id)=>{
    try{
      const response = await axios.post(`${apiUrl}musiclist`,{title:id},{
        withCredentials:true
      });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
)

export default SongsAPI;