import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userPageSlice = createSlice({
  name: 'userPage',
  initialState: {},
  reducers: {
    setOneUserPage: (state, action) => action.payload,
  },
});

export const { setOneUserPage } = userPageSlice.actions;

export const getUserPage = (id) => (dispatch) => {
  axios.get(`/api/userpage/${id}`, id)
    .then((res) => dispatch(setOneUserPage(res.data)));
};

export default userPageSlice.reducer;
