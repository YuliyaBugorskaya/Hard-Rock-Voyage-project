import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, CssBaseline, MenuItem, InputLabel, Stack, Box,
  Container, Pagination, PaginationItem,
} from '@mui/material';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';
import { setFilterData } from '../../redux/YuliyaSlices/allEventsSlice';
import EventCard from '../EventCard/EventCard';
import { getArchiveEvents } from '../../redux/YuliyaSlices/archiveEventsSlice';

export default function ArchivePage() {
  const dispatch = useDispatch();
  const archiveEvents = useSelector((state) => state.archiveEvents);
  const [input, setInput] = useState('');

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (input === 'All') {
      dispatch(getArchiveEvents({ page, input: false }));
    } else {
      dispatch(getArchiveEvents({ page, input }));
    }
  }, [page, input]);

  const dateChange = (event) => {
    setInput(event.target.value);
    dispatch(setFilterData(event.target.value));
  };

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
      <Box sx={{ width: '310px' }}>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel id="demo-simple-select-label">Дата</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={dateChange}
                  value={input}
                  label="дата"
                  sx={{ marginBottom: '10px', backgroundColor: 'white' }}
                >
                  {archiveEvents.dates?.map((el) => (<MenuItem key={el.id} value={el.startDate}>{el.startDate}</MenuItem>
                  ))}
                  <MenuItem value="All">All</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <Button sx={{ width: '100%', maxWidth: 360, marginTop: '10px' }} onClick={changeHandler} variant="contained" color="secondary">
              Создать событие
            </Button> */}
            <List sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              padding: '0',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
            >
              {archiveEvents.events
                .map((el) => (
                  <EventCard key={el.id} oneEventCard={el} />
                ))}
            </List>
          </div>
          <div>
            <Stack spacing={2}>
              <Pagination
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  backgroundColor: 'white',
                  paddingY: '20px',
                  borderEndEndRadius: '20px',
                  borderEndStartRadius: '20px',
                }}
                page={Number(page)}
                count={archiveEvents.countPage}
                onChange={(_, num) => setPage(num)}
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
      </Box>
    </Box>
  );
}
