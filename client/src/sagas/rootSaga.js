import { all } from 'redux-saga/effects';
import webSocketWatcher from './wsSaga';

export default function* rootSaga() {
  yield all([
    webSocketWatcher(),
  ]);
}
