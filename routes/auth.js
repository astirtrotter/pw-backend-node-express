const AuthController = require('../controllers/auth');
const AuthMiddleware = require('../middleware/auth');

module.exports = (router, passport) => {
  // views
  router.get('/login', AuthMiddleware.requireLogout, AuthController.showLogin);
  router.get('/signup', AuthMiddleware.requireLogout, AuthController.showSignup);
  router.get('/logout', AuthMiddleware.requireLogin, AuthController.logout);

  // apis
  router.post('/api/login', AuthMiddleware.requireLogout, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
  router.post('/api/signup', AuthMiddleware.requireLogout, AuthController.signup);
};