import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSongTitle } from "../redux/songTitleSlice";

const Explore = () => {
  const API = import.meta.env.VITE_API_URL
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);

  async function fetchRandomSongs(){
      try {
        const res = await axios.get(`${API}explore`, {
          withCredentials: true,
        });
        setSongs(res.data.data);
      } 
      catch (err) {
        console.log(err.response?.data);
      }
  };

  useEffect(() => {
    fetchRandomSongs();
  }, []); 

  return (
    <div className="explore">
      <h1>Explore</h1>
      <div className="explore-grid">
        {songs.map((song, index) => (
          <div
            key={index}
            className="explore-card"
            onClick={()=>dispatch(setSongTitle(song.title))}
          >
            <img src={song.poster} alt={song.title} />
            <p>{song.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;