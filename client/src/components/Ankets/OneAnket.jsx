import {
  Button, Card, CardContent, CardMedia, Container, ListItem, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeAnketStatusNo, changeAnketStatusYes } from '../../redux/YanaSlices/anketsSlice';

export default function OneAnket({ oneAnket }) {
  const dispatch = useDispatch();

  const { id } = useParams;
  const changeStatusTrue = (event) => {
    dispatch(changeAnketStatusYes(event));
    dispatch({ type: 'SEND_YES', payload: id });
  };

  const changeStatusFalse = (event) => {
    dispatch(changeAnketStatusNo(event));
    dispatch({ type: 'SEND_NO', payload: id });
  };

  return (
    <ListItem alignItems="flex-start" sx={{ justifyContent: 'center', marginY: '20px' }}>
      <Card sx={{
        maxWidth: 345,
        width: '100%',
      }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`http://localhost:3001/${oneAnket?.User?.image}`}
          sx={{ height: '400px' }}
        />
        <CardContent>
          <Typography variant="body2">
            {' '}
            {oneAnket?.User?.name}
          </Typography>
          <Typography variant="body2">
            {' '}
            {oneAnket?.message}
          </Typography>

          {oneAnket.statusId === 2 && (
            <Typography variant="body2" sx={{ color: 'silver' }}>
              Заявка отклонена
            </Typography>
          )}
          {oneAnket.statusId === 3 && (
            <Typography variant="body2" sx={{ color: 'silver' }}>
              Заявка одобрена
            </Typography>
          )}
          <Container sx={{ textAlign: 'center' }}>
            {oneAnket.statusId === 1 && (
              <>
                <Button variant="text" onClick={() => changeStatusTrue(oneAnket)}>
                  Одобрить
                </Button>
                <Button variant="text" onClick={() => changeStatusFalse(oneAnket)}>
                  Отклонить
                </Button>
              </>
            )}
          </Container>
        </CardContent>
      </Card>
    </ListItem>
  );
}
