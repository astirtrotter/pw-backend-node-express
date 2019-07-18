const tagRoute = require('./tag');

module.exports = router => {
  // init error handler
  router.use((req, res, next) => {
    res.error = (statusCode, error) => {
      var err;
      if (error instanceof Error) {
        err = error;
      } else {
        err = new Error(error);
      }
      err.status = statusCode;
      return err;
    };
    next();
  });

  // home page
  router.get('/', (req, res) => {
    res.render('index', {title: 'Admin Panel'})
  });

  tagRoute(router);

  // 404
  router.use((req, res, next) => {
    next(res.error(404, 'Page Not Found'));
  });

  return router;
};