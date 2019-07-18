const TagControllers = require('../controllers/tag');
const AuthMiddleware = require('../middleware/auth');

module.exports = router => {
  // views
  router.get('/tags', TagControllers.showTags);

  // apis
  router.get('/api/tags', TagControllers.getTags);
  router.post('/api/tags/create', AuthMiddleware.requireLogin, TagControllers.createTag);
  router.put('/api/tags/update/:id', AuthMiddleware.requireLogin, TagControllers.updateTag);
  router.delete('/api/tags/remove/:id', AuthMiddleware.requireLogin, TagControllers.removeTag);
};