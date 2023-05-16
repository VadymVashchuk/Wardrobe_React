import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/loginPage/loginPage';
import Wardrobe from './pages/wardrobe/wardrobe';
import './App.scss'

// export const isLoggedinContext = React.createContext({});

function App() {

  const currentUser = true;
  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/"/>
  }


  return (
    <>
      <Routes>
        {/* <Route path="/" element={ isLoggedIn ? <Wardrobe /> : <LoginPage />} />
        <Route path="wardrobe" element={isLoggedIn ? <Wardrobe /> : <LoginPage />} /> */}

        <Route path="/" element={<LoginPage />} />
        <Route path="wardrobe" element={<RequireAuth> <Wardrobe /> </RequireAuth>} />
      </Routes>
    </>
  );
}

export default App;
