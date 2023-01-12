import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const allEventsSlice = createSlice({
  name: 'allEvents',
  initialState: { events: [], dates: [], countPage: 1 },
  reducers: {
    setAllEvents: (state, action) => action.payload,
    setFilterData: (state, action) => action.startDate,
    addEvent: (state, action) => [...state, action.payload],
    deleteEvent: (state, action) => state.filter((el) => el.id !== action.payload),
    changeoneEvent: (state, action) => state.map((el) => {
      if (el.id === action.payload.id) {
        return { ...el, statusId: action.payload.statusId };
      } return el;
    }),
  },

});

export const {
  setAllEvents, setFilterData, addEvent, deleteEvent, changeoneEvent,
} = allEventsSlice.actions;

export const getAllEventsForMain = () => (dispatch) => {
  axios.get('/api/allevents')
    .then((res) => dispatch(setAllEvents(res.data)));
  // .then((res) => dispatch(console.log(res.data)));
};

export const getAllEvents = (body) => (dispatch) => {
  console.log('bbbbbbody', body);
  axios.post('/api/allEvents', body)
    .then((res) => dispatch(setAllEvents({ events: res.data.content, dates: res.data.allDates, countPage: res.data.totalPages })));
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
export const changeStatus5 = (id) => (dispatch) => {
  axios.patch('/api/status/', id)
    .then((res) => dispatch(changeoneEvent(res.data)));
};

export default allEventsSlice.reducer;
