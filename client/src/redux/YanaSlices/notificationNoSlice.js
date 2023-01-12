import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const NotificationNoSlice = createSlice({
  name: 'notificationNo',
  initialState: '',
  reducers: {
    setNo: (state, action) => action.payload,
  },
});

export const { setNo } = NotificationNoSlice.actions;

export default NotificationNoSlice.reducer;
