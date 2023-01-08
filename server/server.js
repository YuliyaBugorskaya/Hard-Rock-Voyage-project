const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const path = require('path');
const userRouter = require('./routes/userRouter');
const apiRouter = require('./routes/apiRouter');
const uploadRouter = require('./routes/uploadRouter');

require('dotenv').config();

const app = express();
app.use(express.json({ extended: true })); // все запросы между клиентом и сервером в формате json
// путь к статике для получения фото
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 3001;
app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
}));

app.use('/user', userRouter);
app.use('/api', apiRouter);
app.use('/upload', uploadRouter);
app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
