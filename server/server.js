const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');
const uploadRouter = require('./routes/uploadRouter');

const commentRouter = require('./routes/commentRouter');
const mapRouter = require('./routes/mapRouter');
require('dotenv').config();

const app = express();
app.use(express.json({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 3001;
app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.locals.ws = new Map();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionParser = session({
  name: 'sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

app.use(sessionParser);
app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/comment', commentRouter);
app.use('/map', mapRouter);
app.use('/upload', uploadRouter);

const server = http.createServer(app);

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

  sessionParser(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', (ws, request) => {
  const { id, name } = request.session.user;

  app.locals.ws.set(id, { ws, user: request.session.user, room: false });

  for (const [, wsClient] of app.locals.ws) {
    wsClient.ws.send(JSON.stringify(
      { type: 'ONLINE_USERS', payload: Array.from(app.locals.ws.values()).map((el) => el.user) },
    ));
  }

  ws.on('message', (message) => {
    console.log('message from frontend', JSON.parse(message), id);
    const fromFront = JSON.parse(message);

    switch (fromFront.type) {
      case 'SEND_PUSH':
        for (const [, wsClient] of app.locals.ws) {
          if (wsClient.user.id != id) {
            wsClient.ws.send(JSON.stringify(
              { type: 'PUSH_SEND', payload: { message: fromFront.payload.message.message, user_id: fromFront.payload.id } },
            ));
          }
        }
        break;
      default:
        break;
    }
  });
  ws.on('close', () => {
    app.locals.ws.delete(id);
    for (const [, wsClient] of app.locals.ws) {
      wsClient.ws.send(JSON.stringify(
        { type: 'ONLINE_USERS', payload: Array.from(app.locals.ws.values()).map((el) => el.user) },
      ));
    }
  });
});

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
