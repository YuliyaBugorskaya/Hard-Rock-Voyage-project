import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const allEventsSlice = createSlice({
  name: 'allEvents',
  initialState: [],
  reducers: {
    setAllEvents: (state, action) => action.payload,
    setFilterData: (state, action) => {
      state.filter((el) => el.startDate === action.payload);
    },
    addEvent: (state, action) => [...state, action.payload],
    deleteEvent: (state, action) => state.filter((el) => el.id !== action.payload),
  },

});

export const {
  setAllEvents, setFilterData, addEvent, deleteEvent,
} = allEventsSlice.actions;

export const getAllEvents = () => (dispatch) => {
  axios.get('/api/allEvents')
    .then((res) => dispatch(setAllEvents(res.data)));
  // .then((res) => console.log(dispatch(setAllEvents(res.data))));
};

export const submitEvent = (event) => (dispatch) => {
  console.log('======event======', event);
  axios.post('/api/addEvent', event)
    .then((res) => dispatch(addEvent(res.data)));
};
export const deleteHandlerEvent = (id) => (dispatch) => {
  axios.delete(`/api/deleteEvent/${id}`)
    .then(() => dispatch(deleteEvent(id)));
};

export default allEventsSlice.reducer;
