const TagControllers = require('../controllers/tag');

module.exports = router => {
  // views
  router.get('/tags', TagControllers.showTags);

  // apis
  router.get('/api/tags', TagControllers.getTags);
  router.post('/api/tags/create', TagControllers.createTag);
  router.put('/api/tags/update/:id', TagControllers.updateTag);
  router.delete('/api/tags/remove/:id', TagControllers.removeTag);
};