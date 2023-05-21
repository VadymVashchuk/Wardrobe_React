import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase';

import './style.scss';

const LoginPage = (props:{logInStatus:Boolean, setLogInStatus:Function }) => {
  const {logInStatus, setLogInStatus} = props


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("login", email);
        localStorage.setItem("isLoggedIn", 'true');
        setLogInStatus(true)
      }
      );
  }
  return (
    <>
      <div className='root'>
        <Box className="wrapper">
          <Typography variant="h3" margin={3} fontWeight='600'>PLEASE, LOG IN</Typography>
          <TextField className="input-el" onChange={e => setEmail(e.target.value)} margin='normal' autoComplete="off" label="Email" type="email" variant="outlined" color="primary" />
          <TextField className="input-el" onChange={e => setPassword(e.target.value)} margin='normal' autoComplete="off" label="Password" type="password" variant="outlined" />
          <Button onClick={LogIn} className="btn-el" variant="contained">LOG IN</Button>
        </Box>
      </div>
    </>
  )
}

export default LoginPage;