import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const oneEventSlice = createSlice({
  name: 'OneEvent',
  initialState: {},
  reducers: {
    setOneEvent: (state, action) => action.payload,
  },
});

export const { setOneEvent } = oneEventSlice.actions;

export const getOneEvent = (id) => (dispatch) => {
  axios.get(`/api/oneEvent/${id}`, id)
    .then((res) => dispatch(setOneEvent(res.data)));
};

export default oneEventSlice.reducer;
