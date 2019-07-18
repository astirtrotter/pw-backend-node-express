const User = require('../models/user');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.signup = (req, res, next) => {
  let data = {
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name
    }
  };
  User.create(data, (err, user) => {
    if (err) {
      console.log(err);
      req.flash('error', err.message);
      return res.redirect('/signup');
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/login');
      }
      res.redirect('/');
    });
  });
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// view

exports.showLogin = (req, res, next) => {
  res.render('auth/login', {
    title: 'Log In'
  });
};

exports.showSignup = (req, res, next) => {
  res.render('auth/signup', {
    title: 'Sign Up'
  });
};