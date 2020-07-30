const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const PostgreSqlStore = require('connect-pg-simple')(session);

const { PG_URI } = process.env;

require('dotenv').config();

const signUpRouter = require('./Routers/signupRouter');
const exploreRouter = require('./Routers/exploreRouter');
const submitRouter = require('./Routers/submitRouter');
const loginRouter = require('./Routers/loginRouter');
const profileRouter = require('./Routers/profileRouter');

const initializePassport = require('./passport');

const app = express();
const PORT = 3000;

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
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
