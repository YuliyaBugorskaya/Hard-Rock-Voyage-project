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
        '& .MuiTextField-root': { m: 1, width: '25ch', marginX: '0' },
      }}
      display="flex"
      autoComplete="off"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      onSubmit={submitHandler}
    >
      <FormControl sx={{
        backgroundColor: 'white', borderRadius: '10px', padding: '20px',
      }}
      >
        <Typography variant="h6" component="h2" sx={{ flexGrow: 1, textAlign: 'center', marginBottom: '10px' }}>
          Регистрация
        </Typography>
        <TextField
          name="name"
          required
          id="outlined-required-name"
          label="Имя"
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
          label="Пароль"
          type="password"
          value={input.password}
          onChange={inputHandler}
          sx={{ width: '100%' }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: '#222c3c', marginTop: '10px' }}
        >
          Зарегистрироваться

        </Button>
      </FormControl>
    </Box>
  );
}
