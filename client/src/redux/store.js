import { configureStore } from '@reduxjs/toolkit';
import allEventsSlice from './YuliyaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';
import userSlice from './EugeneSlices/userSlice';
import archiveEventsSlice from './YuliyaSlices/archiveEventsSlice';

export default configureStore({
  reducer: {
    allEvents: allEventsSlice,
    userPage: userPageSlice,
    user: userSlice,
    oneEvent: oneEventSlice,
    archiveEvents: archiveEventsSlice,
  },

});
