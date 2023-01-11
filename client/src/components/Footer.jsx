import React from 'react';
import {
  AppBar, Box, Toolbar, Typography, Link, Button,
} from '@mui/material';

export default function NavBar() {
  return (

    <Box
      component="footer"
      sx={{
        marginTop: 'auto',
      }}
    >
      <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: 'blue' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Button variant="text" sx={{ color: 'white' }}>Главная страница</Button>
            </Link>
          </Typography>
          <Link href="/aboutUs" underline="none">
            <Button variant="text" sx={{ color: 'white' }}>О нас</Button>
          </Link>
          <Link href="/" underline="none">
            <Button variant="text" sx={{ color: 'white' }}>Контакты</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
