const express = require('express');
const authController = require('../Controllers/authController.js');

const router = express.Router();

router.get('/', authController.getProfile, (req, res) => {
  res.status(200).json(res.locals.userData);
});

module.exports = router;
