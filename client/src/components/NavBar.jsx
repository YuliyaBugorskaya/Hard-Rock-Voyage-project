import React, { useEffect, useState } from 'react';
import {
  AppBar, Box, Toolbar, Link, Button, IconButton, Menu, MenuItem,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser, checkUser } from '../redux/EugeneSlices/userSlice';

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  console.log(user, 'user---++');
  useEffect(() => {
    dispatch(checkUser());
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#222c3c' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} sx={{ fontFamily: 'Geometria' }}>
          <div>
            <Link href="/" underline="none">
              <Button variant="text" sx={{ color: 'white' }}>Главная страница</Button>
            </Link>
            <Link href="/allEvents" underline="none">
              <Button variant="text" sx={{ color: 'white' }}>События</Button>
            </Link>
          </div>
          <div>
            <Link href="/" underline="none">
              <img src="../css/images/IMG_0362.PNG" alt="biker" style={{ width: '100px', height: '80px' }} />
            </Link>
          </div>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Link href="/archiveEvents" underline="none">
              <Button variant="text" sx={{ color: 'white' }}>Завершенные события</Button>
            </Link>

            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {
                  user?.image
                    ? (
                      <img src={`http://localhost:3001/${user.image}`} alt="avatar" style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
                    )
                    : (<img src="/css/images/avatar-scaled.jpeg" alt="avatar" style={{ borderRadius: '50%', height: '50px', width: '50px' }} />
                    )
                    }
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {
                  user.id
                    ? (
                      <>
                        <Link href="/lk" underline="none">
                          <MenuItem onClick={handleClose}>
                            <Button variant="text" sx={{ color: 'blue' }}>Личный кабинет</Button>
                          </MenuItem>
                        </Link>
                        <Link href="/newEvent" underline="none">
                          <MenuItem onClick={handleClose}>
                            <Button variant="text" sx={{ color: 'blue' }}>Создать событие</Button>
                          </MenuItem>
                        </Link>
                        <Link href="/" underline="none">
                          <MenuItem onClick={handleClose}>
                            <Button onClick={logoutHandler} variant="text" sx={{ color: 'blue' }}>Выйти</Button>
                          </MenuItem>
                        </Link>
                      </>
                    )
                    : (
                      <>
                        <Link href="/signin" underline="none">
                          <MenuItem onClick={handleClose}>
                            <Button variant="text" sx={{ color: 'blue' }}>Вход</Button>
                          </MenuItem>
                        </Link>
                        <Link href="/signup" underline="none">
                          <MenuItem onClick={handleClose}>
                            <Button variant="text" sx={{ color: 'blue' }}>Регистрация</Button>
                          </MenuItem>
                        </Link>
                      </>
                    )
                }
              </Menu>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
