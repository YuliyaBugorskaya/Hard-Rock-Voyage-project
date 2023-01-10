import { configureStore } from '@reduxjs/toolkit';
import allEventsSlice from './YanaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';
import userSlice from './EugeneSlices/userSlice';
import LKSlice from './YanaSlices/LKSlice';
import statusSlice from './YanaSlices/statusSlice';

export default configureStore({
  reducer: {
    allEvents: allEventsSlice,
    oneEvent: oneEventSlice,
    userPage: userPageSlice,
    user: userSlice,
    LK: LKSlice,
    status: statusSlice,
  },

});
