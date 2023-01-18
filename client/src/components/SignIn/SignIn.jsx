import React from 'react';
import {
  Box, Button, FormControl, TextField, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signinUser } from '../../redux/EugeneSlices/userSlice';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinUser(Object.fromEntries(new FormData(e.target))));
    navigate('/');
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', marginX: '0' },
      }}
      autoComplete="off"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      onSubmit={submitHandler}
    >
      <FormControl sx={{
        backgroundColor: 'white', borderRadius: '10px', padding: '20px',
      }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', marginBottom: '10px' }}>
          Авторизация
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
          required
          id="outlined-password-input"
          label="Пароль"
          type="password"
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: '#222c3c', marginTop: '10px' }}
        >
          Авторизоваться

        </Button>
      </FormControl>
    </Box>
  );
}
