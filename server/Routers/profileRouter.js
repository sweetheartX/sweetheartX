const express = require('express');
const authController = require('../Controllers/authController.js');

const router = express.Router();

// Loads profile info when creator avatar is clicked on idea card
router.get('/:username', authController.getProfile, (req, res) => {
  // console.log('res.locals.ideas', res.locals.ideas);
  res.json(res.locals.userData);
});

// Updates profile data when user submits form 
router.get('/:username/edit', authController.editProfile, (req, res) => {
  // console.log('res.locals.ideas', res.locals.ideas);
  res.status(200).send('Profile successfully updated')
});
module.exports = router;
