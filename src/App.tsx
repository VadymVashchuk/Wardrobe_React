import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage/loginPage';
import Wardrobe from './pages/wardrobe/wardrobe';
import './App.scss'


function App() {
  const [currentUser, setCurrentUser] = useState(false)

  return (
    <>
      {(currentUser === true) ? <Navigate to="wardrobe" /> : <Navigate to="/login" />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
      </Routes>

    </>
  );
}

export default App;
