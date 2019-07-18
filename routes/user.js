const UserController = require('../controllers/user');
const AuthMiddleware = require('../middleware/auth');

module.exports = router => {
  // views
  // router.get('/users', AuthMiddleware.requireLogin, UserController.showUsers);

  // apis
  // router.get('/api/users', AuthMiddleware.requireLogin, UserController.getUsers);
  // router.post('/api/users/create', AuthMiddleware.requireAdmin, UserController.createUser);
  // router.put('/api/users/update/:id', AuthMiddleware.requireAdmin, UserController.updateUser);
  // router.delete('/api/users/remove/:id', AuthMiddleware.requireAdmin, UserController.removeUser);
};