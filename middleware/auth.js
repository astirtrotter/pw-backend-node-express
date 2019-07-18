exports.requireLogin = (req, res, next) => {
  if (!req.user) {
    req.flash('info', 'You need to sign in first');
    return res.redirect('/login');
  }
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.user.meta.admin) {
    req.flash('warning', 'Only superuser can access to this feature');
    return next(res.error(401, 'Superuser permission is required'))
  }
  next();
};

exports.requireLogout = (req, res, next) => {
  if (req.user) return next(res.error(400, 'You must log out first'));
  next();
};