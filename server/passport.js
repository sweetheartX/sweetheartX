const bcrypt = require('bcrypt');
const db = require('./Models/model');

module.exports = {
  authenticateUser: async (username, password, done) => {
    try {
      console.log('Authenticating...');
      // Find same username in database
      const result = await db.query('SELECT * FROM User_credentials WHERE username = $1', [
        username,
      ]);
      const [user] = result.rows;

      // Find and compare same password
      const pwMatch = await bcrypt.compare(password, user.password);

      // if password matched send user body
      if (pwMatch) {
        console.log('password match');
        return done(null, user);
      }

      console.log('password is not matched');
      return done(null, false, { message: 'password is not matched' });
    } catch (err) {
      return done(null, false, { message: err });
    }
  },

  serializeUser: (user, done) => {
    console.log(`SERIALIZE: ${user}`);
    done(null, user.username);
  },

  deserializeUser: async (username, done) => {
    try {
      const result = await db.query('SELECT * FROM User_credentials WHERE username = $1', [
        username,
      ]);
      const [user] = result.rows;
      return done(null, user);
    } catch (err) {
      console.log(`Deserialize error: ${err}`);
      return done(err);
    }
  },
};
