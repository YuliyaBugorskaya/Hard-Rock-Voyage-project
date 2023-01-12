import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import allEventsSlice from './YanaSlices/allEventsSlice';
import oneEventSlice from './YanaSlices/oneEventSlice';
import userPageSlice from './YuliyaSlices/allEventsSlice';
import userSlice from './EugeneSlices/userSlice';
import archiveEventsSlice from './YuliyaSlices/archiveEventsSlice';
import LKSlice from './YanaSlices/LKSlice';
import statusSlice from './YanaSlices/statusSlice';
import rootSaga from '../sagas/rootSaga';
import onlineSlice from './YanaSlices/onlineSlice';
import onlineUsersSlice from './YanaSlices/onlineUsersSlice';
import NotificationSlice from './YanaSlices/NotificationSlice';
import anketsSlice from './YanaSlices/anketsSlice';
import membersSlice from './YanaSlices/membersSlice';
import notificationNoSlice from './YanaSlices/notificationNoSlice';
import coordSlice from './MaratSlices/coordSlice';
import NotificationYesSlice from './YanaSlices/NotificationYesSlice';

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
    onLineUsers: onlineUsersSlice,
    online: onlineSlice,
    notification: NotificationSlice,
    allAnkets: anketsSlice,
    members: membersSlice,
    notificationYes: NotificationYesSlice,
    notificationNo: notificationNoSlice,
    coords: coordSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;
