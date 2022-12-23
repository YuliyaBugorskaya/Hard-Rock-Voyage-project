import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {
  List, CssBaseline, Typography, Container, Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../../redux/YuliyaSlices/allEventsSlice';

export default function AllEvents() {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.allEvents);
  console.log(allEvents, 'allEvents---');

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);
  const arr = ['may', 'june', 'august'];
  const startDate = 'Date';

  const navigate = useNavigate();
  const changeHandler = () => {
    navigate('/newEvent');
  };
  const handleChange = (event) => {
    setStartDate(event.target.value);
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth={false} fullWith>

        {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Дата</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={startDate}
                label="дата"
                onChange={handleChange}
              >
                {allEvents?.map((el) => (<MenuItem value={el.startDate}>{el.startDate}</MenuItem>

                ))}

              </Select>
            </FormControl>
          </Box>
          <Button onClick={changeHandler} variant="contained" color="secondary">
            Создать событие
          </Button>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {/* {allEvents?.map((el) => (
              <EventCard key={el.id} oneEventCard={el} />
            ))} */}
          </List>
        </div>
        <div>
          <Stack spacing={2}>
            <Pagination
              count={3}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </div>
      </Container>
    </div>

  );
}
