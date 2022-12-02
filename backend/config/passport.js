const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// configure passport provider options
passport.use(new GoogleStrategy({
    clientID: '1019538637408-na4h2ppfg9g4p5mbqj5pc1ojhfhf85pi.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/auth/google/callback'
  }, (accessToken, refreshToken, profile, email ,done) => {
    done(null, email)
  })
);
  
  // serialize user when saving to session
  passport.serializeUser((user, serialize) => {
    serialize(null, user);
  });
  
  // deserialize user when reading from session
  passport.deserializeUser((obj, deserialize) => {
    deserialize(null, obj);
  });