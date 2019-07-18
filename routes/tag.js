const TagController = require('../controllers/tag');
const AuthMiddleware = require('../middleware/auth');

const authMiddlewareAdmin = [AuthMiddleware.requireLogin, AuthMiddleware.requireAdmin];

module.exports = router => {
  // views
  router.get('/tags', AuthMiddleware.requireLogin, TagController.showTags);
  // router.get('/tags/:id', TagController.showTag);
  // router.get('/tags/create', TagController.showCreateTag);

  // apis
  router.get('/api/tags', TagController.getTags);
  router.post('/api/tags/create', authMiddlewareAdmin, TagController.createTag);
  router.put('/api/tags/:id/update', authMiddlewareAdmin, TagController.updateTag);
  router.delete('/api/tags/:id/remove', authMiddlewareAdmin, TagController.removeTag);
};