exports.requireLogin = (req, res, next) => {
  if (!req.user) {
    return next(res.error(401, 'You are not authorized'))
  }
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.user.meta.admin) {
    return next(res.error(401, 'You are not allowed'))
  }
  next();
};