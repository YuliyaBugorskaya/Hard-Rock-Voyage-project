import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const statusSlice = createSlice({
  name: 'status',
  initialState: [],
  reducers: {
    setStatus: (state, action) => action.payload,
  },
});

export const { setStatus } = statusSlice.actions;

export const getAllStatuses = () => (dispatch) => {
  axios.get('/api/statuses')
    .then((res) => dispatch(setStatus(res.data)));
};

export default statusSlice.reducer;
