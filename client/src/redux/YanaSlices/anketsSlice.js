import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const anketsSlice = createSlice({
  name: 'allAnkets',
  initialState: [],
  reducers: {
    setAllAnkets: (state, action) => action.payload,
    changeoneAnket: (state, action) => state.map((el) => {
      if (el.id === action.payload.id) {
        return { ...el, statusId: action.payload.statusId };
      } return el;
    }),
  },
});

export const { setAllAnkets, changeoneAnket } = anketsSlice.actions;

export const getAllAnkets = () => (dispatch) => {
  axios.get('/api/allankets')
    .then((res) => dispatch(setAllAnkets(res.data)));
  // .then((res) => dispatch(console.log(res.data)));
};

export const changeAnketStatusYes = (id) => (dispatch) => {
  axios.patch('/api/anket/yes', id)
    .then((res) => dispatch(changeoneAnket(res.data)));
};
export const changeAnketStatusNo = (id) => (dispatch) => {
  axios.patch('/api/anket/no', id)
    .then((res) => dispatch(changeoneAnket(res.data)));
};

export default anketsSlice.reducer;
