import React from 'react'
import axios from 'axios';
import logo from "../photos/tuneXlogo.png"

const SignUp = ({closeSignup,openLogin}) => {
  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const API = import.meta.env.VITE_API_URL; // ← .env se lo

  async function signup(e) {
    e.preventDefault();
    try {
      await axios.post(`${API}signup`, {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((res) => console.log(res.data) );
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      closeSignup(); 
      openLogin();
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  return (
    <div className='signupBox'>
      <button className="closeSignup" onClick={closeSignup}>✕</button>
      <img src={logo} alt="" />
      <h1>Sign up to start listening</h1>
      <form className='signupForm' onSubmit={(e) => { signup(e); closeSignup(); }}>
        <input  type="text" placeholder='Username' ref={nameRef}/>
        <input type="text" placeholder="Enter your email" ref={emailRef}/>
        <input type="password" placeholder="Enter your password" ref={passwordRef}/>
        <button className='signupBtn' type="submit">Sign up</button>
      </form>
    </div>
  )
}

export default SignUp