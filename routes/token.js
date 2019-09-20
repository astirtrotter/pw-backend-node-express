const TokenController = require('../controllers/token');
const AuthMiddleware = require('../middleware/auth');

module.exports = router => {
  router.param('tokenId', (req, res, next, tokenId) => {
    const Token = require('../models/token');
    Token.findById(tokenId, (err, token) => {
      if (err) return next(err);
      req.token = token;
      next();
    });
  });

  // views
  router.get('/tokens', AuthMiddleware.requireLogin, TokenController.showTokens);

  // apis
  // router.get('/api/tokens', TokenController.getTokens);
  router.post('/api/tokens', AuthMiddleware.requireAdmin, TokenController.createToken);
  router.get('/api/tokens/:code', TokenController.getTokenUser);
  router.get('/api/tokens/:tokenId/delete', AuthMiddleware.requireAdmin, TokenController.removeToken);
};