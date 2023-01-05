import React from 'react';
import {
  AppBar, Box, Toolbar, Link, Button,
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
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
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
          </div>
          <div>
            <NavLink to="/">
              <Link href="/" underline="none">
                <img src="https://img.freepik.com/premium-vector/bikers-emblem-mascot-logo-inspiration_10051-855.jpg" alt="biker" style={{ width: '100px', height: '100px' }} />
              </Link>
            </NavLink>
          </div>
          <div>

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
            <img src="https://uploads.scratch.mit.edu/get_image/user/35278713_60x60.png" alt="kaka" style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
