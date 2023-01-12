import { configureStore } from '@reduxjs/toolkit';
import allEventsSlice from './YuliyaSlices/allEventsSlice';
import allEventsSliceYana from './YanaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';
import userSlice from './EugeneSlices/userSlice';
import archiveEventsSlice from './YuliyaSlices/archiveEventsSlice';
import LKSlice from './YanaSlices/LKSlice';
import statusSlice from './YanaSlices/statusSlice';
import commentSlice from './EugeneSlices/commentSlice';
import coordSlice from './MaratSlices/coordSlice';

export default configureStore({
  reducer: {
    allEventsYana: allEventsSliceYana,
    allEvents: allEventsSlice,
    userPage: userPageSlice,
    user: userSlice,
    oneEvent: oneEventSlice,
    archiveEvents: archiveEventsSlice,
    LK: LKSlice,
    status: statusSlice,
    comment: commentSlice,
    coords: coordSlice,
  },

});
