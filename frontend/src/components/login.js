import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';



function Login({ onLogin }) {
 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the login request to the server
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });

      // Assuming the token is returned on successful login
      const { token } = response.data;

      // Store the token in local storage or session storage
      localStorage.setItem('token', token);

      // Call the login handler to update isAuthenticated
      onLogin();

    }
    catch (error) {
      if (error.response) {
        console.error('Login error:', error.response.data);
        
      }
      else {
        console.error('Login error:', error);  
      }
    }
  };

  const handleNavigateToSignUp = () => {
    navigate('/SignUp'); // Navigate to the sign-up page
  };

  return (
    <div className='b2'>
    <div className='main-div '>
      <h2 className='head-h2'>Welcome to Prakash Bharat</h2>
      <form onSubmit={handleSubmit}>
        <label className="l2-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label  className="l2-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button className='login-button' onClick={(e) => handleSubmit(e)}zz>
          Log In
        </button>
      </form>
      <p className='para'>If not registered:</p>
      <button className='login-button'  onClick={handleNavigateToSignUp}>
        Sign Up
      </button>
      </div>
      </div>
  );
}

export default Login;
