exports.requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.user.meta.admin) {
    return next(res.error(400, 'You are not allowed. Only admin user can edit'))
  }
  next();
};

exports.requireLogout = (req, res, next) => {
  if (req.user) return next(res.error(400, 'You must log out first'));
  next();
};