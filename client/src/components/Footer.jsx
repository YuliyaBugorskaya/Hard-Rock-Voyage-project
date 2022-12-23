import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Link, Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box sx={{
      flexGrow: 1, position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'red',
    }}
    >
      <AppBar position="static" sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/">
              <Link href="/" underline="none">
                <Button variant="text" sx={{ color: 'white' }}>Главная страница</Button>
              </Link>
            </NavLink>

          </Typography>
          <NavLink to="/">
            <Link href="/" underline="none">
              <Button variant="text" sx={{ color: 'white' }}>О нас</Button>
            </Link>
          </NavLink>
          <NavLink to="/">
            <Link href="/" underline="none">
              <Button variant="text" sx={{ color: 'white' }}>Контакты</Button>
            </Link>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
