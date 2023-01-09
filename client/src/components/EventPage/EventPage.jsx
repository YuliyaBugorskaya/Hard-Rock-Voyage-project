import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { getUserPage } from '../../redux/YanaSlices/userPageSlice';

export default function EventPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const OneEvent = useSelector((state) => state.oneEvent);

  const seeUser = () => {
    dispatch(getUserPage(OneEvent.userId));
    navigate(`/user/${OneEvent.userId}`);
  };

  const regOnJourney = () => {
    // тут модалка на регистрацию на событие
  };

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={OneEvent.image}
        />
        <Typography component="div">
          {OneEvent.description}
        </Typography>
        <Typography component="div">
          Организатор:
          {' '}
          <Button variant="text" onClick={() => seeUser()}>
            {' '}
            {OneEvent?.User?.name}
          </Button>

        </Typography>
        <Typography component="div">
          {OneEvent.title}
        </Typography>
        <Typography component="div">
          {OneEvent.fulldescription}
        </Typography>
        <Button variant="text" onClick={() => regOnJourney()}>
          Подать заявку на поездку
        </Button>
        <Typography component="div">
          Тут будут участники
        </Typography>
        {/* // если событие завершено */}
        {OneEvent.statusId === 6
              && (
                <>
                  <Button variant="text">
                    Оставить комментарий
                  </Button>
                  <Button variant="text">
                    Добавить фотографии в альбом
                  </Button>
                </>
              )}
      </Container>
    </>
  );
}
