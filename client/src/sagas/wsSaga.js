import {
  take, put, call, fork, takeLatest, takeEvery,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setOnLine } from '../redux/YanaSlices/onlineSlice';
import { setOnLineUsers } from '../redux/YanaSlices/onlineUsersSlice';

function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log('action --->', action);
      emit({ type: 'SOCKET_CONNECT' });
    };

    socket.onerror = function (error) {
      console.log(error);
      emit({ type: 'SOCKET_DISCONNECT' });
    };

    socket.onmessage = function (event) {
      emit(JSON.parse(event.data));
    };

    socket.onclose = function (event) {
      emit({ type: 'SOCKET_DISCONNECT' });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  return new WebSocket(process.env.REACT_APP_WSURL);
}

function* wsWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);
  //   yield fork(enterRoom, socket);
  //   yield fork(codeUpdate, socket);
  while (true) {
    try {
      const backAction = yield take(socketChannel);
      console.log('backAction -->', backAction);
      switch (backAction.type) {
        case 'SOCKET_CONNECT':
          yield put(setOnLine(true));
          break;
        case 'SOCKET_DISCONNECT':
          yield put(setOnLine(false));
          break;
        case 'ONLINE_USERS':
          yield put(setOnLineUsers(backAction.payload));
          break;
        case 'CODE_SEND':
          yield put(setCode(backAction.payload));
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* webSocketWatcher() {
  yield takeEvery('SOCKET_INIT', wsWorker);
}
