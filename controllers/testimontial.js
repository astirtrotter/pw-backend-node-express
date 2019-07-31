const Testimontial = require('../models/testimontial');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createTestimontial = (req, res, next) => {
  if (!req.files || !req.files.image) return next(res.error(400, 'Image is required'));

  let data = {
    name: req.body.name,
  };
  Testimontial.create(data, (err, testimontial) => {
    if (err) return next(res.error(400, err.message));

    let image = req.files.image;
    image.mv(`./public/assets/testimontials/${testimontial._id}`, err => {});
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
  if (req.body.name !== req.testimontial.name) {
    req.testimontial.name = req.body.name;
    hasChange = true;
  }
  if (req.files && req.files.image) {
    let image = req.files.image;
    image.mv(`./public/assets/testimontials/${req.testimontial._id}`, err => {});
    saveTestimontialUpdates(req, res, next);
  } else if (hasChange) {
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
  Testimontial.find({}, {}, {sort:{name: 1}}, (err, testimontials) => {
    if (err) return next(err);
    res.render('testimontials/index', {
      title: 'Testimontials',
      testimontials
    });
  });
};