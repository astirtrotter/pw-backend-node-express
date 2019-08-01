const Testimontial = require('../models/testimontial');
const Client = require('../models/client');
const waterfall = require('async-waterfall');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createTestimontial = (req, res, next) => {
  let data = {
    client: req.body.client,
    feedback: req.body.feedback,
  };
  Testimontial.create(data, (err, testimontial) => {
    if (err) return next(res.error(400, err.message));
    req.flash('success', 'Testimontial created successfully');
    res.redirect('back');
  });
};

exports.getTestimontials = (req, res, next) => {
  Testimontial.find({}, (err, testimontials) => {
    if (err) return next(err);
    res.json({testimontials});
  });
};

function saveTestimontialUpdates(req, res, next) {
  req.testimontial.save()
    .then(() => {
      req.flash('success', 'Testimontial updated successfully');
      res.redirect('back');
    })
    .catch(err => next(res.error(400, err.message)));
}

exports.updateTestimontial = (req, res, next) => {
  let hasChange = false;
  if (req.body.feedback !== req.testimontial.feedback ||
    req.body.client !== req.testimontial.client) {
    req.testimontial.feedback = req.body.feedback;
    req.testimontial.client = req.body.client;
    hasChange = true;
  }
  if (hasChange) {
    saveTestimontialUpdates(req, res, next);
  } else {
    res.redirect('back');
  }
};

exports.removeTestimontial = (req, res, next) => {
  req.testimontial.remove()
    .then(() => {
      req.flash('success', 'Testimontial removed successfully');
      res.redirect('back');
    })
    .catch(next);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showTestimontials = (req, res, next) => {
  waterfall([
    function (callback) {
      Testimontial.find().then(testimontials => callback(null, testimontials));
    },
    function (testimontials, callback) {
      Client.find().then(clients => callback(null, testimontials, clients));
    },
    function (testimontials, clients, callback) {
      let data = {
        title: 'Testimontials',
        testimontials,
        clients
      };
      callback(null, data);
    }
  ], (err, data) => {
    if (err) return next(err);
    res.render('testimontials/index', data);
  });
};