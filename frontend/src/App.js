// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import PrivateRoute from './context/PrivateRoute';
import Complaint from './components/complaintPage';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar handleNavigation={handleNavigation} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/complaint"
            element={<PrivateRoute element={<Complaint />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
