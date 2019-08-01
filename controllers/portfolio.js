const Portfolio = require('../models/portfolio');
const Service = require('../models/service');
const Skill = require('../models/skill');
const Testimontial = require('../models/testimontial');
const waterfall = require('async-waterfall');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createPortfolio = (req, res, next) => {
  if (!req.files || !req.files.image) return next(res.error(400, 'Image is required'));

  let data = {
    name: req.body.name,
    description: req.body.description,
    services: req.body.services,
    skills: req.body.skills,
    testimontial: req.body.testimontial
  };
  Portfolio.create(data, (err, portfolio) => {
    if (err) return next(res.error(400, err.message));
    req.files.image.mv('./public/assets/portfolios/' + portfolio._id);
    req.flash('success', 'Portfolio created successfully');
    res.redirect('back');
  });
};

exports.getPortfolios = (req, res, next) => {
  Portfolio.find({}, (err, portfolios) => {
    if (err) return next(err);
    res.json({portfolios});
  });
};

function savePortfolioUpdates(req, res, next) {
  req.portfolio.save()
    .then(() => {
      req.flash('success', 'Portfolio updated successfully');
      res.redirect('back');
    })
    .catch(err => next(res.error(400, err.message)));
}

exports.updatePortfolio = (req, res, next) => {
  req.portfolio.name = req.body.name;
  req.portfolio.description = req.body.description;
  req.portfolio.services = req.body.services;
  req.portfolio.skills = req.body.skills;
  req.portfolio.testimontial = req.body.testimontial;

  if (req.files && req.files.image) {
    req.files.image.mv(`./public/assets/portfolios/${req.portfolio._id}`);
  }
  savePortfolioUpdates(req, res, next);
};

exports.removePortfolio = (req, res, next) => {
  req.portfolio.remove()
    .then(() => {
      req.flash('success', 'Portfolio removed successfully');
      res.redirect('back');
    })
    .catch(next);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showPortfolios = (req, res, next) => {
  waterfall([
    function (callback) {
      Portfolio.find().then(users => callback(null, users));
    },
    function (portfolios, callback) {
      Testimontial.find().then(testimontials => callback(null, portfolios, testimontials));
    },
    function (portfolios, testimontials, callback) {
      Service.find().then(services => callback(null, portfolios, testimontials, services));
    },
    function (portfolios, testimontials, services, callback) {
      Skill.find({}, {}, {sort: {type: 1, name: 1}}).then(skills => callback(null, portfolios, testimontials, services, skills));
    },
    function (portfolios, testimontials, services, skills, callback) {
      let data = {
        title: 'Portfolios',
        portfolios,
        testimontials,
        services,
        skills
      };
      callback(null, data);
    }
  ], (err, data) => {
    if (err) return next(err);
    res.render('portfolios/index', data);
  });
};