import React, { useState } from 'react';
import { Routes, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/loginPage/loginPage';
import Wardrobe from './pages/wardrobe/wardrobe';
import './App.scss'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="wardrobe" element={<Wardrobe />} />
      </Routes>
    </>
  );
}

export default App;
