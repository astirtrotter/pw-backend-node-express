const User = require('../models/user');
const waterfall = require('async-waterfall');
const Token = require('../models/token');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createToken = (req, res, next) => {
  let data = {
    code: req.body.code,
    user: req.body.user
  };
  Token.create(data, (err, token) => {
    if (err) return next(res.error(400, err.message));

    req.flash('success', 'Token created successfully');
    res.redirect('back');
  });
};

exports.getTokens = (req, res, next) => {
  Token.find({}, (err, tokens) => {
    if (err) return next(err);
    res.json({tokens});
  });
};

exports.removeToken = (req, res, next) => {
  req.token.remove()
    .then(() => {
      req.flash('success', 'Token removed successfully');
      res.redirect('back');
    })
    .catch(next);
};

exports.getTokenUser = (req, res, next) => {
  Token.findOne({code: req.params.code}, (err, token) => {
    if (err) return next(err);
    if (!token) return next(res.error(400, 'Invalid code'));
    res.json({
      user: token.user
    });
  });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showTokens = (req, res, next) => {
  waterfall([
    function (callback) {
      Token.find().then(tokens => callback(null, tokens));
    },
    function (tokens, callback) {
      User.find().then(users => callback(null, tokens, users));
    },
    function (tokens, users, callback) {
      let data = {
        title: 'Tokens',
        users,
        tokens
      };
      callback(null, data);
    }
  ], (err, data) => {
    if (err) return next(err);
    res.render('tokens/index', data);
  });
};