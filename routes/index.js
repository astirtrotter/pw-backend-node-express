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
    // res.render('500', {error: new Error('message error')});
  });

  return router;
};