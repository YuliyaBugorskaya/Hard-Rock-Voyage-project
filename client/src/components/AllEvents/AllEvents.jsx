import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import { getAllEvents } from '../../redux/YanaSlices/allEventsSlice';
import EventCard from '../EventCard/EventCard';

export default function AllEvents() {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.allEvents);

  // console.log(allEvents, 'allEvents---');

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {allEvents?.map((el) => (
        <EventCard key={el.id} oneEventCard={el} />
      ))}
    </List>
  );
}
