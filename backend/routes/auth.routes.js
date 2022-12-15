const express = require('express');
const passport = require('passport');
const router = express.Router();
//const AuthorController = require('../controllers/author.controller');

router.get('/google',
  passport.authenticate('google', { scope: [ 'profile', 'email' ] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/posts/nopermission' }),
  (req, res) => {
    const currentUser = req.user.emails[0].value
    res.redirect(`/login/author/${currentUser}`);
  }
);

router.get('/logout', (req, res) => {

  localStorage.clear(); 
  req.session.destroy((err) => {
    res.json({message: err})
  });
  res.redirect('/')
});

module.exports = router;