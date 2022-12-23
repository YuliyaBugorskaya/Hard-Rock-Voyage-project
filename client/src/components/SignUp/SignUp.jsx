import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box, Button, FormControl, TextField, Typography,
} from '@mui/material';
import { signupUser } from '../../redux/EugeneSlices/userSlice';

export default function Registration() {
  const [input, setInput] = useEffect('');
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signupUser(Object.fromEntries(new FormData(e.target))));
    window.location = '/';
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      display="flex"
      noValidate
      autoComplete="off"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <form onSubmit={submitHandler}>
        <FormControl>
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Registration
          </Typography>
          <TextField
            name="name"
            required
            id="outlined-required"
            label="Name"
            type="text"
            value={input.name || ''}
            onChange={inputHandler}
          />
          <TextField
            name="email"
            required
            id="outlined-required"
            label="Email"
            type="email"
            value={input.email || ''}
            onChange={inputHandler}
          />
          <TextField
            required
            name="password"
            id="outlined-password-input"
            label="Password"
            type="password"
            value={input.password || ''}
            onChange={inputHandler}
          />
          <Button variant="contained">Sign Up</Button>
        </FormControl>
      </form>

    </Box>
  );
}
