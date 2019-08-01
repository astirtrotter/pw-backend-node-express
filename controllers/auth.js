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
  User.count({}, (err, count) => {
    if (err) return next(err);
    if (count === 0) data.meta = {admin: true, allowed: true};

    User.create(data, (err, user) => {
      if (err) return next(res.error(400, err.message));
      if (count === 0) {
        req.flash('success', 'You became a superuser as being a first registeror');
      } else {
        req.flash('success', 'Please contact superuser to get your account allowed');
      }
      return res.redirect('/login');
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