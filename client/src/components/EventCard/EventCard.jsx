import React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { getOneEvent } from '../../redux/YanaSlices/oneEventSlice';

export default function EventCard({ oneEventCard }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const seeMore = () => {
    dispatch(getOneEvent(oneEventCard.id));
    navigate(`/event/${oneEventCard.id}`);
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image={oneEventCard.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <Button variant="text" onClick={() => seeMore()}>
                {' '}
                {oneEventCard.title}
              </Button>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {oneEventCard.startDate}
              -
              {oneEventCard.finishDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {oneEventCard.description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'silver' }}>
              {oneEventCard?.User?.name}
            </Typography>
            <Container>

              {oneEventCard.statusId === 4 && (
                <Button variant="text">
                  Завершить регистрацию
                </Button>
              )}
              {oneEventCard.statusId === 5
              && (
              <Button variant="text">
                Завершить событие
              </Button>
              )}

              <Button variant="text">
                Удалить событие
              </Button>
            </Container>
          </CardContent>
        </Card>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
