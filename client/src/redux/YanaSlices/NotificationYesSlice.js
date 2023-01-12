import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const NotificationYesSlice = createSlice({
  name: 'notificationYes',
  initialState: '',
  reducers: {
    setYes: (state, action) => action.payload,
  },
});

export const { setYes } = NotificationYesSlice.actions;

export default NotificationYesSlice.reducer;
