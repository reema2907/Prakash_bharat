import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  Button } from '@chakra-ui/react';


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
    <div>
      <h2>Welcome to Prakash Bharat</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <Button colorScheme="teal" onClick={(e) => handleSubmit(e)}zz>
          Log In
        </Button>
      </form>
      <p>If not registered:</p>
      <Button colorScheme="teal" onClick={handleNavigateToSignUp}>
        Sign Up
      </Button>
    </div>
  );
}

export default Login;
