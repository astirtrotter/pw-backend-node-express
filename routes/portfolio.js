const PortfolioController = require('../controllers/portfolio');
const AuthMiddleware = require('../middleware/auth');

const authMiddlewareAdmin = [AuthMiddleware.requireLogin, AuthMiddleware.requireAdmin];

module.exports = router => {
  router.param('portfolioId', (req, res, next, portfolioId) => {
    const Portfolio = require('../models/portfolio');
    Portfolio.findById(portfolioId, (err, portfolio) => {
      if (err) return next(err);
      req.portfolio = portfolio;
      next();
    });
  });

  // views
  router.get('/portfolios', AuthMiddleware.requireLogin, PortfolioController.showPortfolios);

  // apis
  router.get('/api/portfolios', PortfolioController.getPortfolios);
  router.post('/api/portfolios', authMiddlewareAdmin, PortfolioController.createPortfolio);
  router.put('/api/portfolios/:portfolioId', authMiddlewareAdmin, PortfolioController.updatePortfolio);
  router.get('/api/portfolios/:portfolioId/delete', authMiddlewareAdmin, PortfolioController.removePortfolio);
};