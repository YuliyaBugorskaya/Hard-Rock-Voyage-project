import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments: (state, action) => action.payload,

  },
});

export const { setComments } = commentsSlice.actions;

export const getAllComments = (id) => (dispatch) => {
  axios.get(`/api/comments/${id}`)
    .then((res) => dispatch(setComments(res.data)));
};

export default commentsSlice.reducer;
