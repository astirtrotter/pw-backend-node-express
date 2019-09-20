const swaggerUi = require('swagger-ui-express');

module.exports = (router) => {
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup());
};