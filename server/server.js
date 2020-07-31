const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const PgStore = require('connect-pg-simple')(session);

require('dotenv').config();

const http = require('http');
const socket = require('socket.io');
const signUpRouter = require('./Routers/signupRouter');
const exploreRouter = require('./Routers/exploreRouter');
const submitRouter = require('./Routers/submitRouter');
const loginRouter = require('./Routers/loginRouter');
const logoutRouter = require('./Routers/logoutRouter');
const profileRouter = require('./Routers/profileRouter');
const bioRouter = require('./Routers/bioRouter');
const sessionRouter = require('./Routers/sessionRouter');

// PASSPORT
const { authenticateUser, serializeUser, deserializeUser } = require('./passport.js');

passport.use(new LocalStrategy(authenticateUser));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// LAUNCH APP
const { PG_URI, SESSION_SECRET } = process.env;
const app = express();
const PORT = 3000;

// imports used by socket.io
const server = http.createServer(app);
const io = socket(server);
// import functions from message room manager
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// initializePassport(passport);
// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION
app.use(
  session({
    store: new PgStore({ conString: PG_URI }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 Day
  }),
);

// socket logic - add middleware, move to another file? *name is username
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    // add user to room manager using socket ID
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room); // joins user to room
    socket.emit('message', {
      user: 'admin',
      text: `Hi, ${user.name}, you are now in room ${user.room}!`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
    // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Session authentication
app.use(passport.initialize());
app.use(passport.session());

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Routing
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/submit', submitRouter);
app.use('/api/profile', profileRouter);
app.use('/api/bio', bioRouter);
app.use('/api/session', sessionRouter);

// 404 catch all error handler
app.use('*', (req, res) => res.sendStatus(404));

// globoal error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
