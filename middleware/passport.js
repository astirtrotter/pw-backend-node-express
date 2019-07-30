const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, {message: 'Incorrect email'});
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false, {message: 'Incorrect password'});
        if (!user.meta.allowed) return done(null, false, {message: 'You are not allowed by superuser yet'});
        done(null, user);
      });
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

module.exports = passport;