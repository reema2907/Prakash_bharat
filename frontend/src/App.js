import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Complaint from './components/complaintPage';
import Login from './components/login';
import SignUp from './components/SignUp';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated && <Navbar/>} {/* Show Navbar only if authenticated */}
      
      <Routes>
        {/* Public routes for login and signup */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <SignUp onSignUp={handleLogin} />
          }
        />
        
        {/* Protected routes, accessible only if authenticated */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/complaint"
          element={isAuthenticated ? <Complaint /> : <Navigate to="/login" replace />}
        />
        
        {/* Redirect root path to login or home based on authentication */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;