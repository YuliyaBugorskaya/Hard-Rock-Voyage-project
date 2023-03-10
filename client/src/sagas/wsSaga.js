import {
  take, put, call, fork, takeEvery,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { setOnLine } from '../redux/YanaSlices/onlineSlice';
import { setOnLineUsers } from '../redux/YanaSlices/onlineUsersSlice';
import { setNotification } from '../redux/YanaSlices/NotificationSlice';
import { setYes } from '../redux/YanaSlices/NotificationYesSlice';
import { setNo } from '../redux/YanaSlices/notificationNoSlice';

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
      console.log('EVENT', event);
      emit(JSON.parse(event.data));
    };

    socket.onclose = function () {
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

function* sendPush(socket) {
  while (true) {
    const message = yield take('SEND_PUSH');
    socket.send(JSON.stringify(message));
  }
}

function* sendYes(socket) {
  while (true) {
    const message = yield take('SEND_YES');
    socket.send(JSON.stringify(message));
  }
}

function* sendNo(socket) {
  while (true) {
    const message = yield take('SEND_NO');
    socket.send(JSON.stringify(message));
  }
}

function* wsWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);
  yield fork(sendPush, socket);
  yield fork(sendYes, socket);
  yield fork(sendNo, socket);
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
        case 'PUSH_SEND':
          console.log('here');
          yield put(setNotification(backAction.payload));
          break;
        case 'PUSH_SEND_YES':
          console.log('yes');
          yield put(setYes(backAction.payload));
          break;
        case 'PUSH_SEND_NO':
          console.log('no');
          yield put(setNo(backAction.payload));
          break;
        // case 'SEND_YES':
        //   console.log('yes');
        //   yield put(setNotification(backAction.payload));
        //   break;
        // case 'SEND_NO':
        //   console.log('no');
        //   yield put(setNotification(backAction.payload));
        //   break;
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
