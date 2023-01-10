import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: { isFetching: true },
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const signupUser = (user) => (dispatch) => {
  axios.post('user/signup', user)
    .then((res) => dispatch(setUser(res.data)));
};

export const signinUser = (user) => (dispatch) => {
  axios.post('user/signin', user)
    .then((res) => dispatch(setUser(res.data)));
};

export const logoutUser = (user) => (dispatch) => {
  axios('user/logout', user)
    .then(() => dispatch(setUser({})));
};

export const checkUser = () => (dispatch) => {
  axios.post('user/check')
    .then((res) => setTimeout(() => {
      dispatch(setUser(res.data));
    }, 500));
};

export default userSlice.reducer;
