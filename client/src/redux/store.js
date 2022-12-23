import { configureStore } from '@reduxjs/toolkit';
import allEventsSlice from './YuliyaSlices/allEventsSlice';

export default configureStore({
  reducer: {
    allEvents: allEventsSlice,
  },

});
