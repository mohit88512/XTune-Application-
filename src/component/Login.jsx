import React, { useEffect, useRef, useState } from "react";
import logo from "../photos/tuneXlogo.png";
import axios from "axios";

import { useDispatch } from "react-redux";
import { fetchRecentSongs } from "../redux/recentSongsSlice";
import { fetchPlaylist } from "../redux/playlistSlice";  // ← import karo
import { setUser } from "../redux/userSlice";

import { toast } from "react-toastify";

const Login = ({ closeLogin, openSignup}) => {
  const [flag,setFlag]=useState(false);
  const [loading, setLoading] = useState(false);
  let emailRef = useRef();
  let passwordRef = useRef();
  const dispatch = useDispatch();

  const API = import.meta.env.VITE_API_URL // ← .env se lo

  async function login(e) {
  e.preventDefault();
  setLoading(true);
  try {
  const res = await axios.post(
    `${API}login`,
    {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    },
    { withCredentials: true }
  );
  console.log("login res:", res.data);  // ✅ 1

  dispatch(setUser(res.data.data.userName));
  console.log("user set");  // ✅ 2

  await dispatch(fetchRecentSongs());
  console.log("recent songs fetched");  // ✅ 3

  await dispatch(fetchPlaylist());
  console.log("playlist fetched");  // ✅ 4
  toast.success("Login Successful ✅");
  closeLogin();
} catch (err) {
  console.log("CATCH ERROR:", err);  // ✅ full error
  toast.error(err.response?.data?.message || "Login Failed ❌");
} finally {
    setLoading(false);
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
        <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
  {loading ? (
    <span className="spinnerWrapper">
      <svg className="spinnerIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Logging in...
    </span>
  ) : "Login"}
</button>
      </form>
      <p>Don't have an account ?</p>
      <button className="signUpBtn" onClick={openSignup}>
        Sign up
      </button>
    </div>
  );
};

export default Login;
