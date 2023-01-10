import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, FormControl, TextField, Typography,
} from '@mui/material';
import { signupUser } from '../../redux/EugeneSlices/userSlice';

export default function SignUp() {
  const [input, setInput] = useState('');
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signupUser(Object.fromEntries(new FormData(e.target))));
    navigate('/');
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      display="flex"
      autoComplete="off"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      onSubmit={submitHandler}
    >
      <FormControl>
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
          Registration
        </Typography>
        <TextField
          name="name"
          required
          id="outlined-required-name"
          label="Name"
          type="text"
          value={input.name}
          onChange={inputHandler}
        />
        <TextField
          name="email"
          required
          id="outlined-required-email"
          label="Email"
          type="email"
          value={input.email}
          onChange={inputHandler}
        />
        <TextField
          required
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
          value={input.password}
          onChange={inputHandler}
        />
        <Button
          variant="contained"
          type="submit"
        >
          Sign Up

        </Button>
      </FormControl>
    </Box>
  );
}
