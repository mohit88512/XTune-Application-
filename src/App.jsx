import React, { useRef, useState, useEffect } from "react";
import "./Style/style.css";
import "./Style/responsive.css";
import { Routes, Route } from "react-router-dom";

import NavBar from "./component/NavBar";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import MusicList from "./component/MusicList";
import Footer from "./component/Footer";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { useSelector } from "react-redux";
import Explore from "./component/Explore";
import Playlist from "./component/Playlist";
import Search from "./component/Search";

const App = () => {
  const { name } = useSelector(state => state.user);
  const [active, setActive] = useState(name ? null : "login"); 
  // user mil gaya to login/signup band karo
  useEffect(() => {
  if(name){
    setActive(null);
  }
}, [name]);

  return (
    <>
      {/* Dashboard hamesha render hoga — blur sirf active pe */}
      <div className={`${active ? "blur" : ""}`}>
        <NavBar
          openLogin={() => setActive("login")}
          setActive={setActive}
        />

        <div className="main-div" style={{ display: "flex" }}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/music/:id"
              element={<MusicList/>}
            />
            <Route path="/explore" element={<Explore/>} />
            <Route path="/playlist" element={<Playlist/>} />
            <Route path="/search" element={<Search/>}/>
          </Routes>
        </div>

        <Footer />
      </div>

      {/* Login overlay */}
      {active === "login" && (
        <Login
          closeLogin={() => setActive(null)}
          openSignup={() => setActive("signup")}
        />
      )}

      {/* Signup overlay — band hone pe login pe wapas */}
      {active === "signup" && (
        <SignUp
          closeSignup={() => setActive("login")} // ← signup ke baad login pe
          openLogin={() => setActive("login")}
        />
      )}
    </>
  );
};

export default App;