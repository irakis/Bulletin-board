const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthorController = require('../controllers/author.controller');

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/post/nopermission' }),
  (req, res) => {
    //console.log('res.email???', req.user)
    res.redirect('/login/author');
    router.put('/login/author', AuthorController.loginAuthor);  
  }
);

router.get('/logout', (req, res) => { 
  req.session.destroy((err) => {
    res.json({message: err})
  })
});



module.exports = router;