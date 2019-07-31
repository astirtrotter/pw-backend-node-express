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
  let service = req.service;
  service.header.title = req.body.headerTitle;
  service.header.description = req.body.headerDescription;
  service.description.title = req.body.descTitle;
  service.description.subtitle = req.body.descSubtitle;
  service.description.overview = req.body.descOverview;
  service.workflow.parts = [];
  let partCount = req.body.partTitle ? (Array.isArray(req.body.partTitle) ? req.body.partTitle.length : 1) : 0;
  if (partCount === 1 && Array.isArray(req.body.partSubtitle)) partCount = req.body.partSubtitle.length;
  if (partCount === 1 && Array.isArray(req.body.partDescription)) partCount = req.body.partDescription.length;
  let i;
  for (i = 0; i < partCount; i++) {
    let part = {
      title: Array.isArray(req.body.partTitle) ? req.body.partTitle[i] : req.body.partTitle,
      subtitle: Array.isArray(req.body.partSubtitle) ? req.body.partSubtitle[i] : req.body.partSubtitle,
      description: Array.isArray(req.body.partDescription) ? req.body.partDescription[i] : req.body.partDescription,
    };
    service.workflow.parts.push(part);
  }
  service.workflow.steps = req.body.step;
  service.mentalities = [];
  let mentCount = req.body.mentTitle ? (Array.isArray(req.body.mentTitle) ? req.body.mentTitle.length : 1) : 0;
  if (mentCount === 1 && Array.isArray(req.body.mentDescription)) mentCount = req.body.mentDescription.length;
  for (i = 0; i < mentCount; i++) {
    let mentality = {
      title: Array.isArray(req.body.mentTitle) ? req.body.mentTitle[i] : req.body.mentTitle,
      description: Array.isArray(req.body.mentDescription) ? req.body.mentDescription[i] : req.body.mentDescription,
    };
    service.mentalities.push(mentality);
  }

  if (req.files) {
    let image = req.files.image;
    mkdirp.sync('./public/assets/services');
    image.mv(`./public/assets/services/${req.service._id}`, err => {
      if (err) return next(err);
      return saveServiceUpdates(req, res, next);
    });
  } else {
    saveServiceUpdates(req, res, next);
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

exports.showEditService = (req, res, next) => {
  res.render('services/edit', {
    title: 'Edit Service',
    service: req.service
  })
};