import { configureStore } from '@reduxjs/toolkit';
import eventCardSlice from './YanaSlices/eventCardSlice';

export default configureStore({
  reducer: {
    eventCard: eventCardSlice,

  },

});
