const TagControllers = require('../controllers/tag');

module.exports = router => {
  // views
  router.route('/tags')
    .get('/', TagControllers.showTags);

  // apis
  router.route('/api/tags')
    .get('/', TagControllers.getTags)
    .post('/create', TagControllers.createTag)
    .put('/update/:id', TagControllers.updateTag)
    .delete('/remove/:id', TagControllers.removeTag);
};