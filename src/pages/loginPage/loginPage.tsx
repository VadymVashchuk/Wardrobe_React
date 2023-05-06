import React, { useState } from 'react';
import './style.scss';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Navigate, Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <div className='root'>
        <Box className="wrapper">
          <Typography variant="h3" margin={3} fontWeight='600'>PLEASE, LOG IN</Typography>
          <TextField className="input-el" margin='normal' label="Email" type="email" variant="outlined" color="primary" />
          <TextField className="input-el" margin='normal' label="Password" type="password" variant="outlined" />
          <Link to="wardrobe"><Button className="btn-el" variant="contained">LOG IN</Button></Link>
        </Box>
      </div>
    </>
  )
}

export default LoginPage;