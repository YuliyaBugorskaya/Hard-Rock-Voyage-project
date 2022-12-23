import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const allEventsSlice = createSlice({
  name: 'allEvents',
  initialState: [],
  reducers: {
    setAllEvents: (state, action) => action.payload,
  },
});

export const { setAllEvents } = allEventsSlice.actions;

export const getAllEvents = () => (dispatch) => {
  axios.get('/api/allevents')
    .then((res) => dispatch(setAllEvents(res.data)));
  // .then((res) => dispatch(console.log(res.data)));
};

// export const getOneEvent = (id) => (dispatch) => {
//   axios.get(`/api/oneEvent/${id}`, id)
//     .then((res) => dispatch(setAllEvents(res.data)));
// };

export default allEventsSlice.reducer;
