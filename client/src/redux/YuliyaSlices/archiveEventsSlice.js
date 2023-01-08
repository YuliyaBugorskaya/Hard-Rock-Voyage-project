import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const archiveEventsSlice = createSlice({
  name: 'archiveEvents',
  initialState: [],
  reducers: {

    setArchiveEvents: (state, action) => action.payload,
    setFilterData: (state, action) => {
      state.filter((el) => el.startDate === action.payload);
    },
  },

});

export const {
  setArchiveEvents, setFilterData,
} = archiveEventsSlice.actions;

export const getArchiveEvents = (page) => (dispatch) => {
  axios.post('/api/archiveEvents', page)
    // .then((res) => console.log(res.data));
    .then((res) => dispatch(setArchiveEvents(res.data)));
};
export default archiveEventsSlice.reducer;
