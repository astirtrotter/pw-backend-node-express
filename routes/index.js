module.exports = (router, passport) => {
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

    let render = res.render;
    res.render = (view, locals, cb) => {
      if (typeof locals == 'object') {
        locals.user = req.user;
        locals.url = req.url;
        locals.messages = req.flash();
      }
      render.call(res, view, locals, cb);
    };

    next();
  });

  // home page
  router.get('/', (req, res) => {
    res.render('index', {
      title: 'Admin Panel'
    })
  });

  require('./auth')(router, passport);
  require('./user')(router);
  require('./tag')(router);

  // 404
  router.use((req, res, next) => {
    next(res.error(404, 'Page Not Found'));
  });

  return router;
};