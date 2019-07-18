const tagRoute = require('./tag');

module.exports = router => {
  // router.use((req, res, next) => {
  //   next();
  // });

  router.get('/', (req, res) => {
    res.render('index', {title: 'Admin Panel'})
  });

  tagRoute(router);

  router.use((req, res) => {
    res.render('404', {url: req.url});
    // var error = new Error('message error');
    // error.status = 500;
    // res.render('500', {error});
  });

  return router;
};