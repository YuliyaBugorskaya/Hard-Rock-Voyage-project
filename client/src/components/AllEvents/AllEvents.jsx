import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, CssBaseline, MenuItem, InputLabel, Stack, Box,
  Container, Button, Pagination, PaginationItem,
} from '@mui/material';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, NavLink } from 'react-router-dom';
import { getAllEvents, setFilterData } from '../../redux/YuliyaSlices/allEventsSlice';
import EventCard from '../EventCard/EventCard';

export default function AllEvents() {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.allEvents);
  const [input, setInput] = useState('');

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (input === 'All') {
      dispatch(getAllEvents({ page, input: false }));
    } else {
      dispatch(getAllEvents({ page, input }));
    }
  }, [page, input]);

  const navigate = useNavigate();
  const changeHandler = () => {
    navigate('/newEvent');
  };

  const dateChange = (event) => {
    setInput(event.target.value);
    dispatch(setFilterData(event.target.value));
  };

  if (!allEvents || !allEvents.events) return null;

  return (
    <Box
      className="allEvents"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0.4, width: '55ch' },
        backgroundImage: `url(${'../css/images/_7Fr1kwBRRM.jpeg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      display="flex"
      noValidate
      autoComplete="off"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <div>
        <CssBaseline />
        <Container maxWidth={false} disableGutters sx={{ width: '350px' }}>
          <div>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth sx={{ marginY: '20px', backgroundColor: 'white' }}>
                <InputLabel id="demo-simple-select-label">Дата</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={dateChange}
                  value={input}
                  label="дата"
                >
                  {allEvents.dates?.map((el) => el.startDate).filter((el, ind) => ind === allEvents.dates.map((element) => element.startDate).indexOf(el))
                    .map((el) => (<MenuItem key={el.id} value={el}>{el}</MenuItem>
                    ))}
                  <MenuItem value="All">All</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              sx={{
                width: '100%', maxWidth: 360, my: '10px', backgroundColor: '#222c3c', marginBottom: '20px',
              }}
              onClick={changeHandler}
              variant="contained"
              color="secondary"
            >
              Создать событие
            </Button>
            <List sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              padding: '0',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
            >
              {allEvents.events
                .map((el) => (
                  <EventCard key={el.id} oneEventCard={el} />
                ))}
            </List>
          </div>
          <div>
            <Stack spacing={2}>
              <Pagination
                page={Number(page)}
                count={allEvents.countPage}
                onChange={(_, num) => setPage(num)}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  backgroundColor: 'white',
                  paddingY: '20px',
                  borderEndEndRadius: '20px',
                  borderEndStartRadius: '20px',
                }}
                renderItem={(item) => (
                  <PaginationItem
                    component={NavLink}
                    to={`/allEvents/?page=${item.page}`}
                    {...item}
                  />
                )}
              />
            </Stack>
          </div>
        </Container>
      </div>
    </Box>
  );
}
