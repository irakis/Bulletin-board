const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthorController = require('../controllers/author.controller');

router.get('/google',
  passport.authenticate('google', { scope: [ 'profile', 'email' ] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/post/nopermission' }),
  (req, res) => {
    res.redirect('/login/author');
  }
);

router.get('/logout', (req, res) => {
   
  req.session.destroy((err) => {
    res.json({message: err})
  })
});

module.exports = router;