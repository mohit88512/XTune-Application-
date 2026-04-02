import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import logo from "../photos/tuneXlogo.png";
import { useDispatch,useSelector } from "react-redux";
import { clearRecentSongs } from "../redux/recentSongsSlice";
import { clearUser} from "../redux/userSlice";
import axios from "axios";
import { clearPlaylist } from "../redux/playlistSlice";
import { clearSongTitle } from "../redux/songTitleSlice";

const NavBar = ({ setActive }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false); // ← hamburger state
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_API_URL // ← .env se lo

  const {name} = useSelector(state=>state.user)

  function handleSearch() {
    if (search.trim()) {
      navigate(`/search?query=${search}`);
      setMenuOpen(false); // ← search ke baad menu band
      setSearch(""); // ← search bar clear
    }
  }

  async function handleLogout() {
    if (name) {
      try {
        await axios.post(`${API}logout`, {}, {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        dispatch(clearUser())
        setActive("login");
        dispatch(clearRecentSongs());
        dispatch(clearPlaylist())
        dispatch(clearSongTitle())
      }
    } else {
      setActive("login");
    }
  }

  return (
    <nav className="Navbar">

      <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon
          icon={menuOpen ? faXmark : faBars}
          color="white"
          size="lg"
        />
      </button>

      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img className="logo" src={logo} />
      </div>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => { navigate("/"); setMenuOpen(false); }} className="comman-li">
            Home
          </li>
          <li className="comman-li" onClick={() => { navigate("/explore"); setMenuOpen(false); }}>
            Explore
          </li>
          <li className="comman-li" onClick={() => { navigate("/playlist"); setMenuOpen(false); }}>
            Playlist
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          type="text"
          placeholder="Search Songs..."
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="navbar-button">
        <button className="navbar-user" onClick={handleLogout}>
          {name ? "Logout" : "Login"}
        </button>
      </div>

    </nav>
  );
};

export default NavBar;