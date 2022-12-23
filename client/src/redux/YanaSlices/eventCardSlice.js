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
  axios.get('/api/allEvents')
    .then((res) => dispatch(setAllEvents(res.data)));
};
export default allEventsSlice.reducer;
