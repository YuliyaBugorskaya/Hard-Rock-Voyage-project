import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
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
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {allAnkets?.map((el) => (
        <OneAnket key={el.id} oneAnket={el} />
      ))}
    </List>
  );
}
