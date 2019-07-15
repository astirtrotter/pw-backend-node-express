const TagController = require('../controllers/tag');

module.exports = router => {
  router.route('/tags')
    .get('/', TagController.getTags)
    .post('/create', TagController.createTag)
    .put('/update/:id', TagController.updateTag)
    .delete('/remove/:id', TagController.removeTag);
};