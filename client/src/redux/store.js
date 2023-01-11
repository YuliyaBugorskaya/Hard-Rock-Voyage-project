import { configureStore } from '@reduxjs/toolkit';
import allEventsSlice from './YanaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';
import userSlice from './EugeneSlices/userSlice';
import LKSlice from './YanaSlices/LKSlice';
import statusSlice from './YanaSlices/statusSlice';
import commentSlice from './EugeneSlices/commentSlice';
import coordSlice from './MaratSlices/coordSlice';

export default configureStore({
  reducer: {
    allEvents: allEventsSlice,
    oneEvent: oneEventSlice,
    userPage: userPageSlice,
    user: userSlice,
    LK: LKSlice,
    status: statusSlice,
    comment: commentSlice,
    coords: coordSlice,
  },

});
