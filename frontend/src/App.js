import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import StreetLightComplaintForm from './components/complaintForm';


import Complaint from './components/complaintPage';


function App() {
  const [currentPage, setCurrentPage] = useState('Home');

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <Navbar handleNavigation={handleNavigation} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
          <Route path="/complaintform" element={<StreetLightComplaintForm />} />
        <Route path="/complaint" element={<Complaint />} />
        
       
      </Routes>
    </Router>
  );
}

export default App;
