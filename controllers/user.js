const User = require('../models/user');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.getUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json({users});
  });
};

exports.updateUser = (req, res, next) => {
  if (req.body.name) req.usr.profile.name = req.body.name;
  if (req.body.location) req.usr.profile.location = req.body.location;
  if (req.body.title) req.usr.profile.title = req.body.title;
  if (req.body.overview) req.usr.profile.overview = req.body.overview;
  if (req.body.admin) req.usr.meta.admin = 'on' === req.body.admin;
  if (req.body.allowed) req.usr.meta.allowed = 'on' === req.body.allowed;

  req.usr.save()
    .then(() => {
      req.flash('success', 'User updated successfully');
      res.redirect('/users');
    })
    .catch(next);
};

exports.removeUser = (req, res, next) => {
    if (req.usr.meta.admin) {
      req.flash('error', 'Superuser cannot be removed');
      return res.redirect('back');
    }
    req.usr.remove()
      .then(() => {
        req.flash('success', 'User removed successfully');
        res.redirect('/users');
      })
      .catch(next);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('users/index', {
      title: 'Users',
      users
    });
  });
};

exports.showUser = (req, res, next) => {
  res.render('users/edit', {
    title: 'Edit User',
    usr: req.usr
  });
};