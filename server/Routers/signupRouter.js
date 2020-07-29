const express = require('express');
const authController = require('../Controllers/authController.js');

const router = express.Router();

// TODO: Redirect to home on successful sign-up?
router.post('/', authController.register, (req, res) => {
  res.status(200).send('register success');
});

module.exports = router;
