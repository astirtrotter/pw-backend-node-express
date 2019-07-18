const User = require('../models/user');

exports.signup = (req, res, next) => {
  var data = {
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name
    }
  };

};

exports.login = (req, res, next) => {

};