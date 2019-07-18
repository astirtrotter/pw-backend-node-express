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
  let data = {
    title: req.body.title,
    description: req.body.description
  };

  User.findOneAndUpdate({_id: req.params.id}, {$set: data}, {new: true}, (err, user) => {
    if (err) return next(err);
    req.flash('success', 'User updated successfully');
    res.redirect('/users');
  });
};

exports.removeUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    if (user.meta.admin) {
      req.flash('error', 'Superuser cannot be removed');
      return res.redirect('/users');
    }
    user.remove()
      .then(() => {
        req.flash('success', 'User removed successfully');
        res.redirect('/users');
      })
      .catch(next);
  });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/');
    }
    res.render('users/index', {
      title: 'Users',
      users
    });
  });
};

exports.showUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/users');
    }
    res.render('users/edit', {
      title: 'Edit User',
      user
    });
  });
};