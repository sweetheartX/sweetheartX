const express = require('express');
const passport = require('passport');

const router = express.Router();

// Find & compare user for login
router.post('/', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
