const tagRoute = require('./tag');

module.exports = router => {
  router.get('/', (req, res) => {
    res.render('index', {title: 'Admin Panel'})
  });

  tagRoute(router);

  return router;
};