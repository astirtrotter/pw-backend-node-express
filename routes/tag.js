const TagController = require('../controllers/tag');
const AuthMiddleware = require('../middleware/auth');

module.exports = router => {
  // views
  router.get('/tags', TagController.showTags);

  // apis
  router.get('/api/tags', TagController.getTags);
  router.post('/api/tags/create', AuthMiddleware.requireLogin, TagController.createTag);
  router.put('/api/tags/update/:id', AuthMiddleware.requireLogin, TagController.updateTag);
  router.delete('/api/tags/remove/:id', AuthMiddleware.requireLogin, TagController.removeTag);
};