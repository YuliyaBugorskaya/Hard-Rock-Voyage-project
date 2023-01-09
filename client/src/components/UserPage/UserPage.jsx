import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getUserLK } from '../../redux/YanaSlices/LKSlice';

export default function UserPage() {
  const UserInfo = useSelector((state) => state.userPage);
  // const userLK = useSelector((state) => state.LK);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToLK = () => {
    dispatch(getUserLK(UserInfo.id));
    navigate('/lk');
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={UserInfo?.image}
          alt="Live from space album cover"
        />

        <Typography>
          {UserInfo.name}
        </Typography>
      </Stack>
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {UserInfo.about}
      </Container>
      <Button variant="text" onClick={() => goToLK()}>
        Личный кабинет

      </Button>
    </>
  );
}
