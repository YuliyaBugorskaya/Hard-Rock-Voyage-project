import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'user',
  initialState: { isFetching: true },
  reducers: {
    setUser: (state, action) => action.payload,
    updateAvatar: (state, action) => {
      console.log(action.payload, '11111');
      return ({ ...state, image: action.payload, id: 22 });
    },
  },
});

export const { setUser, updateAvatar } = userSlice.actions;

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
  // .catch((err) => setTimeout(() => {
  //   dispatch(setUser({}));
  // }, 500));
};

// Редактирование профиля, компонент Profile
export const updateUser = (user) => (dispatch) => {
  axios.patch('user/updateprofile', user)
    .then((res) => dispatch(setUser(res.data)));
};

export default userSlice.reducer;
