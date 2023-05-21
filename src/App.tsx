import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/loginPage/loginPage';
import Wardrobe from './pages/wardrobe/wardrobe';
import NotFoundPage from './pages/notFound/NotFoundPage';
import './App.scss'


function App() {
  // const auth = getAuth();
  // const user = auth.currentUser;
  // console.log(user)
  const [logInStatus, setLogInStatus] = useState(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    } else {
      return false;
    }
  })

  return (
    <>
      <Routes>
        <Route path="/" element={logInStatus === true ? <Wardrobe logInStatus={logInStatus} setLogInStatus={setLogInStatus} /> : <Navigate to='/login' />} />
        <Route path="/login" element={logInStatus === true ? <Navigate to='/' /> : <LoginPage logInStatus={logInStatus} setLogInStatus={setLogInStatus} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
