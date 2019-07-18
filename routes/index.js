const tagRoute = require('./tag');

module.exports = router => {
  // router.use((req, res, next) => {
  //   next();
  // });

  router.get('/', (req, res) => {
    res.render('index', {title: 'Admin Panel'})
  });

  tagRoute(router);

  router.use((req, res, next) => {
    var error = new Error('Page Not Found');
    error.status = 404;
    next(error)
  });

  return router;
};