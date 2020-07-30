const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const PostgreSqlStore = require('connect-pg-simple')(session);

const { PG_URI } = process.env;

require('dotenv').config();

const http = require('http'); 
const socket = require('socket.io');
const signUpRouter = require('./Routers/signupRouter');
const exploreRouter = require('./Routers/exploreRouter');
const submitRouter = require('./Routers/submitRouter');
const loginRouter = require('./Routers/loginRouter');
const profileRouter = require('./Routers/profileRouter');

const initializePassport = require('./passport');

const app = express();
const PORT = 3000;

// imports used by socket.io
const server = http.createServer(app);
const io = socket(server);
// import functions from message room manager
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');


initializePassport(passport);

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    // store: new PostgreSqlStore({
    //   conString: PG_URI,
    // }),
    cookie: {
      maxAge: 3500000,
    },
    // genid: (req) => {
    //   console.log('inside the session middleware');
    //   console.log(req.sessionID);
    // },
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

// Handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Session authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routing
app.use('/api/login', loginRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/explore', exploreRouter);
app.use('/api/submit', submitRouter);
app.use('/api/profile', profileRouter);

// 404 catch all error handler
app.use('*', (req, res) => res.sendStatus(404));

// globoal error handler
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
