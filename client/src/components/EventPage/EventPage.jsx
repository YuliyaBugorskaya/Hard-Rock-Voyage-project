import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { getOneEvent } from '../../redux/YanaSlices/oneEventSlice';
import AddPointMap from '../Map/AddPointMap';
// import { getUserPage } from '../../redux/YanaSlices/userPageSlice';

export default function EventPage() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const UserInfo = useSelector((state) => state.userPage);

  const OneEvent = useSelector((state) => state.oneEvent);
  const { id } = useParams();
  // const seeUser = () => {
  //   dispatch(getUserPage(OneEvent.userId));
  //   navigate(`/user/${OneEvent.userId}`);
  // };
  const user = useSelector((state) => state.user);

  const regOnJourney = () => {
    // тут модалка на регистрацию на событие
  };

  useEffect(() => {
    dispatch(getOneEvent(id));
  }, [id]);

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
          {/* <Button variant="text" onClick={() => seeUser()}>
            {' '}
            {OneEvent?.User?.name}
          </Button> */}

        </Typography>
        <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={OneEvent?.User?.image}
            alt="Live from space album cover"
          />

          <Typography>
            {OneEvent?.User?.name}
          </Typography>
        </Stack>
        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          {OneEvent?.User?.about}
        </Container>

        <Typography component="div">
          {OneEvent.title}
        </Typography>
        <Typography component="div">
          {OneEvent.fulldescription}
        </Typography>
        {OneEvent.userId !== user.id && OneEvent.statusId === 1 ? (
          <Button variant="text" onClick={() => regOnJourney()}>
            Подать заявку на поездку
          </Button>
        ) : (
          <>
          </>
        )}
        <Typography component="div">
          Тут будут участники
        </Typography>
        {OneEvent.userId === user.id
          && (
            <Box>
              <AddPointMap />
            </Box>
          )}
        {OneEvent.statusId === 2
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
