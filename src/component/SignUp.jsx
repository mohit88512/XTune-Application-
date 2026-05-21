import React ,{useState} from 'react'
import axios from 'axios';
import logo from "../photos/tuneXlogo.png"
import { toast } from 'react-toastify';

const SignUp = ({closeSignup,openLogin}) => {
  const [loading, setLoading] = useState(false);

  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const API = import.meta.env.VITE_API_URL; // ← .env se lo

  async function signup(e) {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post(`${API}signup`, {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
    console.log(res.data);
    toast.success("Signup Successful ✅")
    closeSignup();
    openLogin();
  } catch (err) {
    console.log(err.response?.data);
    toast.error(err.response?.data?.message || "Signup Failed ❌");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className='signupBox'>
      <button className="closeSignup" onClick={closeSignup}>✕</button>
      <img src={logo} alt="" />
      <h1>Sign up to start listening</h1>
      <form className='signupForm' onSubmit={(e) => { signup(e)}}>
        <input  type="text" placeholder='Username' ref={nameRef}/>
        <input type="text" placeholder="Enter your email" ref={emailRef}/>
        <input type="password" placeholder="Enter your password" ref={passwordRef}/>
        <button className='signupBtn' type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
  {loading ? (
    <span className="spinnerWrapper">
      <svg className="spinnerIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      Signing up...
    </span>
  ) : "Sign up"}
</button>
      </form>
    </div>
  )
}

export default SignUp