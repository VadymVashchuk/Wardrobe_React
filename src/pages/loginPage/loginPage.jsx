import React, { useState } from 'react';
import './style.scss';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase';

const LoginPage = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const LogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('wardrobe')
        localStorage.setItem("login", email);
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("isLoggedIn", 'true');
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