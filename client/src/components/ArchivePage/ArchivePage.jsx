import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, CssBaseline, MenuItem, InputLabel, Stack, Box,
  Container, Pagination, PaginationItem,
} from '@mui/material';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink } from 'react-router-dom';
import { getArchiveEvents, setFilterData } from '../../redux/YuliyaSlices/archiveEventsSlice';
import EventCard from '../EventCard/EventCard';

export default function ArchivePage() {
  const dispatch = useDispatch();
  const archiveEvents = useSelector((state) => state.archiveEvents);
  const [input, setInput] = useState('');
  const [isFilter, setIsFilter] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('ya tut');
    dispatch(getArchiveEvents({ page }));
  }, [page]);

  const handleChange = (event) => {
    setInput(event.target.value);
    dispatch(setFilterData(event));
  };
  const itemHandler = () => {
    setIsFilter(false);
  };
  const allHandler = () => {
    setIsFilter(true);
  };
  console.log('isFilter', isFilter);
  return (
    <Box
      className="allEvents"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 0.4, width: '55ch' },
        backgroundImage: `url(${'../css/images/_7Fr1kwBRRM.jpeg'})`,
        backgroundRepeat: 'no-repeat',
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
        <Container maxWidth={false} disableGutters>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ marginTop: '10px' }}>
                <InputLabel id="demo-simple-select-label">Дата</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChange}
                  value={input}
                  label="дата"
                >
                  {archiveEvents?.map((el) => (<MenuItem onClick={itemHandler} key={el.id} value={el.startDate}>{el.startDate}</MenuItem>))}
                  <MenuItem onClick={allHandler} value="All">All</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {archiveEvents?.filter((el) => isFilter || el.startDate === input)?.map((el) => (
                <EventCard key={el.id} oneEventCard={el} />
              ))}
            </List>
          </div>
          <div>
            <Stack spacing={2}>
              <Pagination
                page={Number(page)}
                count={3}
                onChange={(_, num) => setPage(num)}
                renderItem={(item) => (
                  <PaginationItem
                    component={NavLink}
                    to={`/archiveEvents/?page=${item?.page}`}
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
