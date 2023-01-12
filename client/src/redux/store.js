import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from '../sagas/rootSaga';
import allEventsSlice from './YuliyaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YanaSlices/userPageSlice';
import userSlice from './EugeneSlices/userSlice';
import archiveEventsSlice from './YuliyaSlices/archiveEventsSlice';
import LKSlice from './YanaSlices/LKSlice';
import statusSlice from './YanaSlices/statusSlice';
import commentSlice from './EugeneSlices/commentSlice';
import allEventsSliceYana from './YanaSlices/allEventsSlice';
import anketsSlice from './YanaSlices/anketsSlice';
import notificationNoSlice from './YanaSlices/notificationNoSlice';
import NotificationSlice from './YanaSlices/NotificationSlice';
import NotificationYesSlice from './YanaSlices/NotificationYesSlice';
import onlineUsersSlice from './YanaSlices/onlineUsersSlice';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    allEventsYana: allEventsSliceYana,
    allEvents: allEventsSlice,
    userPage: userPageSlice,
    user: userSlice,
    oneEvent: oneEventSlice,
    archiveEvents: archiveEventsSlice,
    LK: LKSlice,
    status: statusSlice,
    comment: commentSlice,
    allAnkets: anketsSlice,
    notificationNo: notificationNoSlice,
    notification: NotificationSlice,
    notificationYes: NotificationYesSlice,
    onlineUsers: onlineUsersSlice,

  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;
