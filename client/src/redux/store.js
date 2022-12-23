import { configureStore } from '@reduxjs/toolkit';
import allEventsSlice from './YanaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';

export default configureStore({
  reducer: {
    allEvents: allEventsSlice,
    oneEvent: oneEventSlice,
    userPage: userPageSlice,

  },

});
