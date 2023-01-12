import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const archiveEventsSlice = createSlice({
  name: 'archiveEvents',
  initialState: { events: [], dates: [], countPage: 1 },
  reducers: {

    setArchiveEvents: (state, action) => action.payload,
    setFilterData: (state, action) => action.startDate,
  },

});

export const {
  setArchiveEvents, setFilterData,
} = archiveEventsSlice.actions;

export const getArchiveEvents = (page) => (dispatch) => {
  axios.post('/api/archiveEvents', page)
    // .then((res) => console.log(res.data));
    .then((res) => dispatch(setArchiveEvents({ events: res.data.content, dates: res.data.allArchiveDates, countPage: res.data.totalPages })));
};
export default archiveEventsSlice.reducer;
