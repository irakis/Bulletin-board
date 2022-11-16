const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthorController = require('../controllers/author.controller');

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/post/nopermission' }),
  (req, res) => { console.log(req.user.emails[0].value, req.sessionID),
    
    router.put('/login/author', AuthorController.loginAuthor);
    res.redirect('/login/author')
    //res.redirect('/');
  }
);

module.exports = router;