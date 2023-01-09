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
  const [isFilter, setIsFilter] = useState(true);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAllEvents({ page }));
  }, [page]);

  const navigate = useNavigate();
  const changeHandler = () => {
    navigate('/newEvent');
  };
  const handleChange = (event) => {
    // console.log(event, 'event---->');
    setInput(event.target.value);
    dispatch(setFilterData(event));
    // setIsFilter(false);
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
        // background-repeat: 'no-repeat',
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

          {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
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
                  {allEvents?.map((el) => (<MenuItem onClick={itemHandler} key={el.id} value={el.startDate}>{el.startDate}</MenuItem>

                  ))}
                  <MenuItem onClick={allHandler} value="All">All</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button sx={{ width: '100%', maxWidth: 360, marginTop: '10px' }} onClick={changeHandler} variant="contained" color="secondary">
              Создать событие
            </Button>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

              {allEvents?.filter((el) => isFilter || el.startDate === input).map((el) => (
              // .
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
                    // slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
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

// export default function AllEvents() {
//   const dispatch = useDispatch();
//   const allEvents = useSelector((state) => state.allEvents);
//   const [input, setInput] = useState('');
//   const [isFilter, setIsFilter] = useState(true);

//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     dispatch(getAllEvents({ page }));
//   }, [page]);

//   const navigate = useNavigate();
//   const changeHandler = () => {
//     navigate('/newEvent');
//   };
//   const handleChange = (event) => {
//     // console.log(event, 'event---->');
//     setInput(event.target.value);
//     dispatch(setFilterData(event));
//     // setIsFilter(false);
//   };
//   const itemHandler = () => {
//     setIsFilter(false);
//   };
//   const allHandler = () => {
//     setIsFilter(true);
//   };
//   console.log('isFilter', isFilter);
//   return (
//     <Box
//       className="allEvents"
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 0.4, width: '55ch' },
//         backgroundImage: `url(${'../css/images/_7Fr1kwBRRM.jpeg'})`,
//       }}
//       display="flex"
//       noValidate
//       autoComplete="off"
//       alignItems="center"
//       justifyContent="center"
//       minHeight="80vh"
//     >
//       <div>
//         <CssBaseline />
//         <Container maxWidth={false} disableGutters>

//           {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
//           <div>
//             <Box sx={{ minWidth: 120 }}>
//               <FormControl fullWidth sx={{ marginTop: '10px' }}>
//                 <InputLabel id="demo-simple-select-label">Дата</InputLabel>
//                 <Select
//                   labelId="demo-simple-select-label"
//                   id="demo-simple-select"
//                   onChange={handleChange}
//                   value={input}
//                   label="дата"
//                 >
//                   {allEvents?.map((el) => (<MenuItem onClick={itemHandler} value={el.startDate}>{el.startDate}</MenuItem>

//                   ))}
//                   <MenuItem onClick={allHandler} value="All">All</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//             <Button sx={{ width: '100%', maxWidth: 360, marginTop: '10px' }} onClick={changeHandler} variant="contained" color="secondary">
//               Создать событие
//             </Button>
//             <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

//               {allEvents?.filter((el) => isFilter || el.startDate === input).map((el) => (
//               // .
//                 <EventCard key={el.id} oneEventCard={el} />
//               ))}
//             </List>
//           </div>
//           <div>
//             <Stack spacing={2}>
//               <Pagination
//                 page={Number(page)}
//                 count={3}
//                 renderItem={(item) => (
//                   <PaginationItem
//                     slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
//                     {...item}
//                   />
//                 )}
//               />
//             </Stack>
//           </div>
//         </Container>
//       </div>
//     </Box>
//   );
// }
