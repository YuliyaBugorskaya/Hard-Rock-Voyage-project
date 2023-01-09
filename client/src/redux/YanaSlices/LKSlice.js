import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const LKSlice = createSlice({
  name: 'LK',
  initialState: [],
  reducers: {
    setLK: (state, action) => action.payload,
  },
});

export const { setLK } = LKSlice.actions;

export const getUserLK = () => (dispatch) => {
  axios.get('/api/lk')
    .then((res) => dispatch(setLK(res.data)));
};

export default LKSlice.reducer;
