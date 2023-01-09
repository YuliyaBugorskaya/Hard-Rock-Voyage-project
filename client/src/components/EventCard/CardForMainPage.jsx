import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOneEvent } from '../../redux/YanaSlices/oneEventSlice';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function CardForMainPage({ oneEventCard }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const seeMore = () => {
    dispatch(getOneEvent(oneEventCard.id));
    navigate(`/event/${oneEventCard.id}`);
  };
  return (
    <Grid container spacing={2} onClick={() => seeMore()}>
      <Grid item>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <Img alt="complex" src={oneEventCard.image} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div" sx={{ cursor: 'pointer' }}>
              {oneEventCard.title}
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ cursor: 'pointer' }}>
              {oneEventCard.startDate}
              {' '}
              -
              {' '}
              {oneEventCard.finishDate}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ cursor: 'pointer' }}>
              {oneEventCard.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" component="div" sx={{ cursor: 'pointer' }}>
            {oneEventCard?.User?.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
