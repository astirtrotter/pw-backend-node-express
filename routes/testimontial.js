const TestimontialController = require('../controllers/testimontial');
const AuthMiddleware = require('../middleware/auth');

const authMiddlewareAdmin = [AuthMiddleware.requireLogin, AuthMiddleware.requireAdmin];

module.exports = router => {
  router.param('testimontialId', (req, res, next, testimontialId) => {
    const Testimontial = require('../models/testimontial');
    Testimontial.findById(testimontialId, (err, testimontial) => {
      if (err) return next(err);
      req.testimontial = testimontial;
      next();
    });
  });

  // views
  router.get('/testimontials', AuthMiddleware.requireLogin, TestimontialController.showTestimontials);

  // apis
  router.get('/api/testimontials', TestimontialController.getTestimontials);
  router.post('/api/testimontials', authMiddlewareAdmin, TestimontialController.createTestimontial);
  router.put('/api/testimontials/:testimontialId', authMiddlewareAdmin, TestimontialController.updateTestimontial);
  router.get('/api/testimontials/:testimontialId/delete', authMiddlewareAdmin, TestimontialController.removeTestimontial);
};