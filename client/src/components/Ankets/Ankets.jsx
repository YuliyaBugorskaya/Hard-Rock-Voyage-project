import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List, Box,
} from '@mui/material';
import OneAnket from './OneAnket';
import { getAllAnkets } from '../../redux/YanaSlices/anketsSlice';

export default function Ankets() {
  const dispatch = useDispatch();

  const allAnkets = useSelector((state) => state.allAnkets);

  console.log(allAnkets);

  useEffect(() => {
    dispatch(getAllAnkets());
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${'../css/images/_7Fr1kwBRRM.jpeg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
    >
      <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        textAlign: 'center',
        borderRadius: '20px',
        marginY: '20px',
      }}
      >
        <Box sx={{ marginY: '20px', fontSize: '25px', fontWeight: '400' }}>
          Заявки от пользователей
        </Box>
        {allAnkets?.map((el) => (
          <OneAnket key={el.id} oneAnket={el} />
        ))}
      </List>
    </Box>
  );
}
