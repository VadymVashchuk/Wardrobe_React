import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/loginPage/loginPage';
import Wardrobe from './pages/wardrobe/wardrobe';
import NotFoundPage from './pages/notFound/NotFoundPage';
import './App.scss'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function App() {

  const auth = getAuth();

  const [logInStatus, setLogInStatus] = useState(false)
  const [loading, setLoading] = useState(true);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogInStatus(true);
      } else {
        setLogInStatus(false);
      }
      setLoading(false);
    });

    if (loading) {
      return <div>Loading...</div>;
    }

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
