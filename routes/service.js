const ServiceController = require('../controllers/service');
const AuthMiddleware = require('../middleware/auth');

const authMiddlewareAdmin = [AuthMiddleware.requireLogin, AuthMiddleware.requireAdmin];

module.exports = router => {
  router.param('serviceId', (req, res, next, serviceId) => {
    const Service = require('../models/service');
    Service.findById(serviceId, (err, service) => {
      if (err) return next(err);
      req.service = service;
      next();
    });
  });

  // views
  router.get('/services', AuthMiddleware.requireLogin, ServiceController.showServices);
  router.get('/services/:serviceId', AuthMiddleware.requireLogin, ServiceController.showEditService);

  // apis
  router.get('/api/services', ServiceController.getServices);
  router.post('/api/services', authMiddlewareAdmin, ServiceController.createService);
  router.put('/api/services/:serviceId', authMiddlewareAdmin, ServiceController.updateService);
  router.get('/api/services/:serviceId/delete', authMiddlewareAdmin, ServiceController.removeService);
};