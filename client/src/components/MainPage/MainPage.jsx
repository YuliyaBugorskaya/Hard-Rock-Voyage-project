import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { getAllEvents } from '../../redux/YuliyaSlices/allEventsSlice';
import CardForMainPage from '../EventCard/CardForMainPage';

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
  const allEvents = useSelector((state) => state.allEvents);

  console.log(allEvents, 'allEvents---');

  useEffect(() => {
    dispatch(getAllEvents({ page: 1 }));
  }, []);

  if (!allEvents || !allEvents.events) return null;

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={2} sx={{ margin: '5px', width: '98%' }}>
        {allEvents.events?.map((el) => (
          <Grid xs={6} sx={{ padding: '5px', cursor: 'pointer' }}>
            <Item>
              <CardForMainPage key={el.id} oneEventCard={el} />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// import axios from 'axios';
// import React, { useCallback, useState } from 'react';

// export default function MainPage() {
//   const [img, setImg] = useState(null);
//   const [avatar, setAvatar] = useState(null);

//   const sendFile = useCallback(async () => {
//     console.log('ya zdes--');
//     try {
//       const data = new FormData();
//       console.log(data, 'data-------->');
//       data.append('avatar', img);
//       console.log(data, '--------->>>');
//       await axios.post('/upload/avatar', data, {
//         headers: {
//           'content-type': 'multipart/form-data',
//         },
//       })
//         // .then((res) => console.log(res.data));
//         .then((res) => setAvatar(res.data.path));
//     } catch (error) {}
//   }, [img]);

//   return (
//     <div>
//       MainPage

//       <div className="fotoFromVoyage">
//         {
//           avatar
//             ? <img className="logo" src={`${avatar}`} alt="avatar" />
//             : <img className="logo" src="/css/images/_7Fr1kwBRRM.jpeg" alt="avatar" />
//         }

//       </div>
//       <input type="file" onChange={(e) => setImg(e.target.files[0])} />
//       <button type="submit" className="btn" onClick={sendFile}>Добавить фото</button>
//     </div>

//   );
// }
