import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();
  useEffect(()=>{
    const auth  = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  })
  const collectData = async () => {

    try {
      const response = await fetch("https://node-ii6z.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();
      if(result.auth){
         localStorage.setItem('user', JSON.stringify(result.result));
          localStorage.setItem('token', JSON.stringify(result.auth));
        navigate('/')
      }
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h3>Register</h3>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={collectData} className="signupBtn" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
