import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const commentSlice = createSlice({
  name: 'comment',
  initialState: '',
  reducers: {
    setComment: (state, action) => action.payload,
  },
});

export const { setComment } = commentSlice.actions;

export const addComment = (text) => (dispatch) => {
  axios.post('comment/addComment', text)
    .then((res) => dispatch(setComment(res.data)));
};

export default commentSlice.reducer;
