import React, { useEffect } from "react";
import SidebarSong from "./Sidebar-song";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentSongs } from "../redux/recentSongsSlice";

const Sidebar = ({song}) => {
  const dispatch = useDispatch();

  const {name} = useSelector(state=>state.user)

  // login ke baad fetch karo
  useEffect(() => {
    dispatch(fetchRecentSongs());
  }, [dispatch]);

  // Redux se recent songs lo — ab objects hain { title, poster }
  const recentSongs = useSelector((state) => {
  console.log("recentSongs state:", state.recentSongs);
  return state.recentSongs.songs;
}) || [];
  return (
    <div className="sidebar">
      <h2 className="sidebar-heading">{name ? `${name.toUpperCase()}'s ` : ''}Recent Songs</h2>

      {recentSongs.length === 0 && <h1 className="no-recent-songs">No recent songs yet ..!!</h1>}

      <div className="sidebarSong-list">
        {recentSongs.length === 0 && <p>No recent songs yet</p>}
        {recentSongs.map((song, index) => (
          <SidebarSong
            key={index}
            title={song.title}
            poster={song.poster}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;