const UserController = require('../controllers/user');
const AuthMiddleware = require('../middleware/auth');

module.exports = router => {
  router.param('userId', (req, res, next, userId) => {
    const User = require('../models/user');
    User.findById(userId, (err, user) => {
      if (err) return next(err);
      req.usr = user;
      next();
    });
  });

  // views
  router.get('/users', AuthMiddleware.requireLogin, UserController.showUsers);
  router.get('/users/:userId', AuthMiddleware.requireLogin, UserController.showUser);

  // apis
  router.get('/api/users', AuthMiddleware.requireLogin, UserController.getUsers);
  router.put('/api/users/:userId', AuthMiddleware.requireAuthorize, UserController.updateUser);
  router.get('/api/users/:userId/delete', AuthMiddleware.requireAuthorize, UserController.removeUser);
  router.get('/api/users/:userId/deleteWork', AuthMiddleware.requireAuthorize, UserController.removeUserWork);
  router.get('/api/users/:userId/deleteEducation', AuthMiddleware.requireAuthorize, UserController.removeUserEducation);
};