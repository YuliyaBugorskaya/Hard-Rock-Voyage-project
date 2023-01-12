import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardForMainPage from '../EventCard/CardForMainPage';
import { getAllEvents } from '../../redux/YanaSlices/allEventsSlice';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  transition: 'transform 0.5s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

export default function MainPage() {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.allEventsYana);

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  // if (!allEvents || !allEvents.events) return null;

  console.log(allEvents, 'allEvents---');
  return (
    <>
      <Box
        sx={{
          m: 1,
          fontSize: '6rem',
          fontWeight: '600',
          // backgroundColor: '#222c3c',
          textAlign: 'center',
          color: '#222c3c',
        }}
      >
        Мотопутешествия
      </Box>
      <Box
        sx={{
          m: 1,
          fontSize: '2rem',
          fontWeight: '700',
          // backgroundColor: '#222c3c',
          textAlign: 'center',
          color: '#222c3c',
          marginBottom: '30px',
        }}
      >
        Совмещаем отдых и приключения
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={2} sx={{ margin: '5px', width: '98%' }}>
          {allEvents?.map((el) => (
            <Grid xs={6} sx={{ padding: '5px', cursor: 'pointer' }}>
              <Item sx={{ backgroundColor: 'white', opacity: '0.9' }}>
                <CardForMainPage key={el.id} oneEventCard={el} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
