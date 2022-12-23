import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Link, Button, Avatar,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/EugeneSlices/userSlice';

export default function NavBar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">
              <Link href="/" underline="none">
                <Button variant="text" sx={{ color: 'white' }}>Главная страница</Button>
              </Link>
            </NavLink>
            <NavLink to="/allEvents">
              <Link href="/allEvents" underline="none">
                <Button onClick={logoutHandler} variant="text" sx={{ color: 'white' }}>События</Button>
              </Link>
            </NavLink>

          </Typography>
          <NavLink to="/">
            <Link href="/" underline="none">
              <Button onClick={logoutHandler} variant="text" sx={{ color: 'white' }}>События</Button>
            </Link>
          </NavLink>
          <NavLink to="/archiveEvents">
            <Link href="/archiveEvents" underline="none">
              <Button onClick={logoutHandler} variant="text" sx={{ color: 'white' }}>Завершенные события</Button>
            </Link>
          </NavLink>
          {
            user.id
              ? (
                <NavLink to="/logout">
                  <Link href="/logout" underline="none">
                    <Button onClick={logoutHandler} variant="text" sx={{ color: 'white' }}>Выйти</Button>
                  </Link>
                </NavLink>
              )
              : (
                <>
                  <NavLink to="/signin">
                    <Link href="/signin" underline="none">
                      <Button variant="text" sx={{ color: 'white' }}>Вход</Button>
                    </Link>
                  </NavLink>
                  <NavLink to="/signup">
                    <Link href="/signup" underline="none">
                      <Button variant="text" sx={{ color: 'white' }}>Регистрация</Button>
                    </Link>
                  </NavLink>
                </>
              )
          }
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
