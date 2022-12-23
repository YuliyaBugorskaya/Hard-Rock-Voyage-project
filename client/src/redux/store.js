import { configureStore } from '@reduxjs/toolkit';
import userSlice from './EugeneSlices/userSlice';

export default configureStore({
  reducer: {
    user: userSlice,
  },

});
