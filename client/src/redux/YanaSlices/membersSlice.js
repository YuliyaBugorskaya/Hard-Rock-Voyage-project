import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const MembersSlice = createSlice({
  name: 'members',
  initialState: [],
  reducers: {
    setMembers: (state, action) => action.payload,
  },
});

export const { setMembers } = MembersSlice.actions;

export const getMembers = (id) => (dispatch) => {
  axios.post('/api/members', id)
    .then((res) => dispatch(setMembers(res.data)));
};

export default MembersSlice.reducer;
