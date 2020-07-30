const express = require('express');
const passport = require('passport');

const router = express.Router();

// Find & compare user for login
router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.status(200).send('logIn success');
  // if (req.isAuthenticated()) {
  //   return res.status(200).json({ state: 'success', user: { firstname: req.user.firstname } });
  // }
  // return res.status(400).json({ state: 'failure', message: 'cannot authenticate' });
});

module.exports = router;
