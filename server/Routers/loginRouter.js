const express = require('express');
const passport = require('passport');

const router = express.Router();

// Find & compare user for login
router.post('/', passport.authenticate('local'), (req, res) => {
  res.status(200).send('logIn success');
});

module.exports = router;
