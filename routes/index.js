const tagRoute = require('./tag');

module.exports = router => {
  // init error handler
  router.use((req, res, next) => {
    res.error = (statusCode, error = null, message = null) => {
      if (error == null) error = new Error(message);
      error.status = statusCode;
      return error;
    };
    next();
  });

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