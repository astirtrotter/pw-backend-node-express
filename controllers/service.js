const Service = require('../models/service');
const mkdirp = require('mkdirp');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createService = (req, res, next) => {
  let data = {
    header: {
      title: req.body.title
    }
  };
  Service.create(data, (err, service) => {
    if (err) return next(res.error(400, err.message));
    req.flash('success', 'Service created successfully');
    res.redirect('back');
  });
};

exports.getServices = (req, res, next) => {
  Service.find({}, (err, services) => {
    if (err) return next(err);
    res.json({services});
  });
};

function saveServiceUpdates(req, res, next) {
  req.service.save()
    .then(() => {
      req.flash('success', 'Service updated successfully');
      res.redirect('back');
    })
    .catch(next);
}

exports.updateService = (req, res, next) => {
  let hasChange = false;
  if (req.body.name !== req.service.name ||
    req.body.description !== req.service.description) {
    req.service.name = req.body.name;
    req.service.description = req.body.description;
    hasChange = true;
  }
  if (req.files && req.files.image) {
    let image = req.files.image;
    mkdirp.sync('./public/assets/services');
    image.mv(`./public/assets/services/${req.service._id}`, err => {
      if (err) return next(err);
      return saveServiceUpdates(req, res, next);
    });
  } else if (hasChange) {
    saveServiceUpdates(req, res, next);
  } else {
    res.redirect('back');
  }
};

exports.removeService = (req, res, next) => {
  req.service.remove()
    .then(() => {
      req.flash('success', 'Service removed successfully');
      res.redirect('back');
    })
    .catch(next);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showServices = (req, res, next) => {
  Service.find({}, (err, services) => {
    if (err) return next(err);
    res.render('services/index', {
      title: 'Services',
      services
    });
  });
};