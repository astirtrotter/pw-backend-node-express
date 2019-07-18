const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getToken = (user) => jwt.sign({userId: user._id}, process.env.TOKEN_SECURITY);

exports.signup = (req, res, next) => {
  var data = {
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name
    }
  };
  User.create(data, (err, user) => {
    if (err) return next(res.error(400, err));
    //res.json({token: getToken(user), user});
    res.redirect('/login');
  });
};

exports.login = (req, res, next) => {
  User.get({email: req.body.email}, (err, users) => {
    if (err) return next(res.error(400, err));
    if (users.length === 0) return next(res.error(400, 'No existing user'));
    const user = users[0];
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return next(400, err);
      if (!isMatch) return next(400, 'Incorrect password');
      res.redirect('/users');
    });
  });
};