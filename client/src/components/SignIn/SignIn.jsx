import React from 'react';
import {
  Box, Button, FormControl, TextField, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { signinUser } from '../../redux/EugeneSlices/userSlice';

export default function SignIn() {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinUser(Object.fromEntries(new FormData(e.target))));
    window.location = '/';
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      onSubmit={submitHandler}
    >
      <FormControl>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Login
        </Typography>
        <TextField
          name="email"
          required
          id="outlined-required"
          label="Email"
          type="email"
        />
        <TextField
          name="password"
          id="outlined-password-input"
          label="Password"
          type="password"
        />
        <Button
          variant="contained"
          type="submit"
        >
          Sign In

        </Button>
      </FormControl>
    </Box>
  );
}
