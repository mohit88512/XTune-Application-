import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPlaylistDB } from "../redux/playlistSlice";
import { useNavigate } from "react-router-dom";
import { setSongTitle } from "../redux/songTitleSlice";

  const Playlist = () => {
  const dispatch = useDispatch();
  const { songs, loading } = useSelector((state) => state.playlist);
  const {name} = useSelector(state=>state.user)

  return (
    <div className="playlist-page">
      <h1>{name ? `${name.toUpperCase()}'s ` : 'My '}Playlist</h1>

      {songs.length === 0 && <h1 className="no-playlist">No songs in playlist yet ..!!</h1>}

      <div className="playlist-list">
        {songs.map((song, index) => (
          <div key={index} className="playlist-song" onClick={()=>dispatch(setSongTitle(song.title))}>
            <img src={song.poster} alt={song.title} />

            <p >{song.title}</p>

            <button
              className="playlist-remove-btn"
              onClick={() => dispatch(removeFromPlaylistDB(song.title))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;