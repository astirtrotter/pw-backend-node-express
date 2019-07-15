const tagRoute = require('./tag');

module.exports = router => {
  tagRoute(router);

  return router;
};