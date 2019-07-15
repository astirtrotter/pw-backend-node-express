const TagController = require('../controller/tag');

module.exports = router => {
  router.post('/create', TagController.createTag);
  router.get('/get', TagController.getTags);
  router.put('/update/:id', TagController.updateTag);
  router.delete('/remove/:id', TagController.removeTag);
};