const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const model = require('./Models/model');

// Authenticate with passport
const initialize = (passport) => {
  // TODO: REFACTOR TO ASYNC / AWAIT
  const autheticateUser = (username, password, done) => {
    // Find same username in database
    model.query(
      'SELECT * FROM User_credentials WHERE username = $1',
      [username],
      (err, results) => {
        // Error handler
        if (err) {
          console.log(err, 'user_credentials error');
          return null;
        }

        // Find and compare same password
        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
              console.log(error, 'bcrypt compare error');
              return null;
            }

            // if password matched send user body
            if (isMatch) {
              console.log('password match');
              return done(null, user);
            }
            console.log('password is not matched');
            return done(null, false, { message: 'password is not matched' });
          });
        } else {
          return done(null, false, { message: 'username is not registered' });
        }
      },
    );
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      autheticateUser,
    ),
  );

  // Session Cookies
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    model.query(
      'SELECT * FROM User_credentials WHERE username = $1',
      [username],
      (err, results) => {
        if (err) {
          console.log(err, 'deserializeUser error');
          return null;
        }

        return done(null, results.rows[0]);
      },
    );
  });
};

module.exports = initialize;
