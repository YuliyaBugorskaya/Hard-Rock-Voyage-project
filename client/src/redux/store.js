import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import allEventsSlice from './YanaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';
import userSlice from './EugeneSlices/userSlice';
import LKSlice from './YanaSlices/LKSlice';
import statusSlice from './YanaSlices/statusSlice';
import rootSaga from '../sagas/rootSaga';
import onlineSlice from './YanaSlices/onlineSlice';
import onlineUsersSlice from './YanaSlices/onlineUsersSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    allEvents: allEventsSlice,
    oneEvent: oneEventSlice,
    userPage: userPageSlice,
    user: userSlice,
    LK: LKSlice,
    status: statusSlice,
    onLineUsers: onlineUsersSlice,
    online: onlineSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;
