"use client";
import * as React from 'react';
import './page.css'
import { motion } from 'framer-motion'
import { useState } from 'react';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [loginStat, setLoginStat] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (userDetails.email === "" || userDetails.password === "") {
            alert("Please fill all the fields");
            return;
        }
        setLoginStat(true);
        window.location.href = "/";
    } catch (error) {
      setLoginStat(false);
      // localStorage.setItem("isIn", 'false');
      console.log(error);
  }
}
  function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      document.getElementById("togglePassword").className = "far fa-eye-slash";
      x.type = "text";
    } else {
      document.getElementById("togglePassword").className = "far fa-eye";
      x.type = "password";
    }
  }
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  }
  
  return (
    <div className="loginBox mob:w-52">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{delay: 0, duration: 1}}
        exit={{ opacity: 0 }}>
          <h2>Login</h2>
          <form>
            <div className="userBox">
              <input type="text" id="userid" name="email" onChange={handleChange} onKeyDown={handleKeyPress}></input>
              <label>Username</label>
            </div>
            <div className="userBox">
              <input type="password" id="myInput" name="password" onChange={handleChange} onKeyDown={handleKeyPress}></input>
              <label>Password</label>
              <i className="far fa-eye" id="togglePassword"
                onClick={() =>
                  myFunction()
                }
              ></i>
    
            </div>
            <a onClick={handleSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </a>
          </form>
        </motion.div>
    </div>
      )
}

export default Login