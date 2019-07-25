const UserController = require('../controllers/user');
const AuthMiddleware = require('../middleware/auth');

module.exports = router => {
  // views
  router.get('/users', AuthMiddleware.requireLogin, UserController.showUsers);
  router.get('/users/:id', AuthMiddleware.requireLogin, UserController.showUser);

  // apis
  router.get('/api/users', AuthMiddleware.requireLogin, UserController.getUsers);
  router.put('/api/users/:id', AuthMiddleware.requireAuthorize, UserController.updateUser);
  router.get('/api/users/:id/delete', AuthMiddleware.requireAuthorize, UserController.removeUser);
};