import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ImageContext from "../context/Imagecontext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SongsAPI from "../redux/apiThunk";
import { addRecentSongToDB } from "../redux/recentSongsSlice";
import { addToPlaylistDB, removeFromPlaylistDB } from "../redux/playlistSlice";
import { setSongTitle } from "../redux/songTitleSlice";

const MusicList = () => {
  const { img } = useContext(ImageContext);

  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(SongsAPI(id))
  }, [id]);

  const {loading,songs,error} = useSelector(state=>state.songsApi)

  const playlistSongs = useSelector((state) => state.playlist.songs);

  const isInPlaylist = (title) => playlistSongs.some((s) => s.title === title);

  return (
    <div className="musicList">
      <div className="music-header">
        <img src={img} alt="" />
        <h1>{songs?.title}</h1>
      </div>

      {songs?.songs?.map((songs, index) => (
        <div
          key={index}
          className="music-block"
          onClick={() => {
  dispatch(setSongTitle(songs.title));
  dispatch(addRecentSongToDB({ title: songs.title, poster: songs.poster })); // ← dono
}}
        >
          <ul key={index}>
            <li>
              <span>{index + 1}</span>
              <img src={songs.poster} alt="poster" />
              <strong> {songs.title}</strong>
              <span> - {songs.artist}</span>

              {/* Plus / Minus button */}
              <button
                className="playlist-btn"
                onClick={(e) => {
                  e.stopPropagation(); // song play mat ho
                  isInPlaylist(songs.title)
                    ? dispatch(removeFromPlaylistDB(songs.title))
                    : dispatch(addToPlaylistDB({ title: songs.title, poster: songs.poster }));
                }}
                >
                {isInPlaylist(songs.title) ? "−" : "+"}
              </button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MusicList;
