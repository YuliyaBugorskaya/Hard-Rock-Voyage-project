import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const NotificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => action.payload,
  },
});

export const { setNotification } = NotificationSlice.actions;

export default NotificationSlice.reducer;
