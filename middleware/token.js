const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.parseToken = (req, res, next) => {
  var token;
  try {
    token = req.headers.authorization.split(' ')[1];
  } catch(e) {
    return next();
  }
  jwt.verify(token, process.env.TOKEN_SECURITY, (err, payload) => {
    if (err) return next(err);
    if (payload) {
      User.findById(payload.userId, (err, user) => {
        if (err) return next(err);
        if (!user) return next(rex.error(401, 'Unauthorized error'));
        req.user = user;
        next();
      });
    }
  });
};