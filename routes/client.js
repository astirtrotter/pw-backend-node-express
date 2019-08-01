const ClientController = require('../controllers/client');
const AuthMiddleware = require('../middleware/auth');

const authMiddlewareAdmin = [AuthMiddleware.requireLogin, AuthMiddleware.requireAdmin];

module.exports = router => {
  router.param('clientId', (req, res, next, clientId) => {
    const Client = require('../models/client');
    Client.findById(clientId, (err, client) => {
      if (err) return next(err);
      req.client = client;
      next();
    });
  });

  // views
  router.get('/clients', AuthMiddleware.requireLogin, ClientController.showClients);

  // apis
  router.get('/api/clients', ClientController.getClients);
  router.post('/api/clients', authMiddlewareAdmin, ClientController.createClient);
  router.put('/api/clients/:clientId', authMiddlewareAdmin, ClientController.updateClient);
  router.get('/api/clients/:clientId/delete', authMiddlewareAdmin, ClientController.removeClient);
};