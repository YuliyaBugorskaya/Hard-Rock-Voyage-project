import { configureStore } from '@reduxjs/toolkit';
import allEventsSlice from './YanaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';
import userSlice from './EugeneSlices/userSlice';

export default configureStore({
  reducer: {
    allEvents: allEventsSlice,
    userPage: userPageSlice,
    user: userSlice,
    oneEvent: oneEventSlice,
  },

});
