import React from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import {useState} from 'react'
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';


const Login = () => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const { handleLogin, loading }= useAuth();

  if(loading){
    return <h1>Loading...</h1>
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(username, password)
    .then(res => {
      console.log("Login successful", res);
    })

  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
          <input
            onInput={(e) => { setUserName(e.target.value) }}
            type="text"
            name="username"
            placeholder="Enter username" />
          <input
            onInput={(e) => { setPassword(e.target.value) }}
            type="password"
            name="password"
            placeholder="Enter password" />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link className="toggleAuthForm" to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login
