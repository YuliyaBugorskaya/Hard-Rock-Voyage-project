import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const oneEventSlice = createSlice({
  name: 'OneEvent',
  initialState: {},
  reducers: {
    setOneEvent: (state, action) => action.payload,
    deleteOneEvent: (state, action) => state.filter((el) => el.id !== action.payload),
  },
});

export const { setOneEvent, deleteOneEvent } = oneEventSlice.actions;

export const getOneEvent = (id) => (dispatch) => {
  axios.get(`/api/oneEvent/${id}`, id)
    .then((res) => dispatch(setOneEvent(res.data)));
};

export const deleteEvent = (id) => (dispatch) => {
  axios.delete(`/api/event/${id}`)
    .then(() => dispatch(deleteOneEvent(id)))
    .catch((err) => console.log(err));
};

export default oneEventSlice.reducer;
