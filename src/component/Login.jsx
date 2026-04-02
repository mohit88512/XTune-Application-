import React, { useEffect, useRef, useState } from "react";
import logo from "../photos/tuneXlogo.png";
import axios from "axios";

import { useDispatch } from "react-redux";
import { fetchRecentSongs } from "../redux/recentSongsSlice";
import { fetchPlaylist } from "../redux/playlistSlice";  // ← import karo
import { setUser } from "../redux/userSlice";


const Login = ({ closeLogin, openSignup}) => {
  const [flag,setFlag]=useState(false);
  let emailRef = useRef();
  let passwordRef = useRef();
  const dispatch = useDispatch();

  const API = import.meta.env.VITE_API_URL // ← .env se lo

  async function login(e) {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${API}login`,
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      { withCredentials: true }
    );
    dispatch(setUser(res.data.data.userName));
    await dispatch(fetchRecentSongs());   // ← await karo
    await dispatch(fetchPlaylist());      // ← await karo
    emailRef.current.value = "";
    passwordRef.current.value = "";
    closeLogin();                         // ← sab ke baad band karo
  } catch (err) {
    console.log(err.response?.data);
  }
}

  return (
    <div className="loginBox">
      <button className="closeLogin" onClick={closeLogin}>✕</button>
      <img src={logo} alt="" />
      <h1>Welcome back</h1>
      <form
        className="loginForm"
        onSubmit={(e) => {
          login(e);
        }}
      >
        <input type="text" placeholder="Enter your email" ref={emailRef} />
        <input
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account ?</p>
      <button className="signUpBtn" onClick={openSignup}>
        Sign up
      </button>
    </div>
  );
};

export default Login;
