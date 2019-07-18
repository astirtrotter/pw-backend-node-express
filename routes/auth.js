const UserController = require('../controllers/user');
const AuthMiddleware = require('../middleware/auth');

module.exports = (router, passport) => {
  // views
  // router.get('/users', AuthMiddleware.requireLogin, UserController.showUsers);
  router.get('/login', AuthMiddleware.requireLogout, UserController.showLogin);
  router.get('/signup', AuthMiddleware.requireLogout, UserController.showSignup);
  router.get('/logout', AuthMiddleware.requireLogin, UserController.logout);

  // apis
  router.post('/api/login', AuthMiddleware.requireLogout, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
  router.post('/api/signup', AuthMiddleware.requireLogout, UserController.signup);
  // router.get('/api/users', AuthMiddleware.requireLogin, UserController.getUsers);
  // router.post('/api/users/create', AuthMiddleware.requireAdmin, UserController.createUser);
  // router.put('/api/users/update/:id', AuthMiddleware.requireAdmin, UserController.updateUser);
  // router.delete('/api/users/remove/:id', AuthMiddleware.requireAdmin, UserController.removeUser);
};