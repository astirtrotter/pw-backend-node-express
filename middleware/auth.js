exports.requireLogin = (req, res, next) => {
  if (!req.user) {
    req.flash('info', 'You need to sign in first');
    return res.redirect('/login');
  }
  next();
};

exports.requireAdmin = (req, res, next) => {
  if (!req.user) {
    req.flash('info', 'You need to sign in first');
    return res.redirect('/login');
  }
  if (!req.user.meta.admin) {
    req.flash('warning', 'Only superuser can access to this feature');
    return next(res.error(400, 'Superuser permission is required'));
  }
  next();
};

exports.requireAuthorize = (req, res, next) => {
  if (!req.user) {
    req.flash('info', 'You need to sign in first');
    return res.redirect('/login');
  }
  if (!req.user.meta.admin && !req.user._id.equals(req.params.id)) {
    req.flash('error', 'You are not authorized');
    return next(res.error(401, 'You are not authorized'));
  }
  next();
};

exports.requireLogout = (req, res, next) => {
  if (req.user) return next(res.error(400, 'You must log out first'));
  next();
};