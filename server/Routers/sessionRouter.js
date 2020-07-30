const express = require('express');
const authController = require('../Controllers/authController');

const router = express.Router();

router.get('/', authController.getUser, (req, res) => {
  const { username } = res.locals;
  res.status(200).json({ username });
});

module.exports = router;
