import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const coordSlice = createSlice({
  name: 'coords',
  initialState: {},
  reducers: {
    setAllCoords: (state, action) => action.payload,
  },
});

export const { setAllCoords } = coordSlice.actions;

export const getAllCoords = (id) => (dispatch) => {
  axios(`/map/allPoints/${id}`)
    .then((res) => dispatch(setAllCoords(res.data)));
  // .then((res) => dispatch(console.log(res.data, 'ne ponyatno')));
};

export const newCoords = (arr, id) => (dispatch) => {
  axios.post(`/map/add/${id}`, arr)
    .then((res) => dispatch(console.log(res.data)));
  // .then((res) => dispatch(console.log(res.data)));
};

export default coordSlice.reducer;
