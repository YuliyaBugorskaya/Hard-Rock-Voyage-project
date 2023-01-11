import React, { useEffect } from 'react';
import CardMedia from '@mui/material/CardMedia';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import EventCard from '../EventCard/EventCard';
import { getUserLK } from '../../redux/YanaSlices/LKSlice';

export default function LKabinet() {
  const dispatch = useDispatch();
  const UserInfo = useSelector((state) => state.user);
  const userLK = useSelector((state) => state.LK);

  const location = useLocation();
  const { setOpen } = location.state || 1; // it's  kostyl :)

  useEffect(() => {
    if (setOpen) {
      setOpen(false);
    }
    dispatch(getUserLK());
  }, []);

  const navigate = useNavigate();
  const seeApplies = () => {
    // dispatch(getUserPage(OneEvent.userId));
    navigate('/adminAnkets');
  };

  const changeProfile = () => {
    // поменЯем инфо
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
          {UserInfo?.name}
        </Typography>
      </Stack>
      <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        {UserInfo?.about}
      </Container>
      <Button variant="text" onClick={() => changeProfile()}>
        Настроить профиль
      </Button>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {userLK?.map((el) => (
          <EventCard key={el.id} oneEventCard={el} />
        ))}
      </List>
      <Button variant="text" onClick={() => seeApplies()}>
        Посмотреть заявки
      </Button>

    </>
  );
}
