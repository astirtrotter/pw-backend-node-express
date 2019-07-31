const Client = require('../models/client');
//const mkdirp = require('mkdirp');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createClient = (req, res, next) => {
  if (!req.files || !req.files.image) return next(res.error(400, 'Image is required'));

  let data = {
    name: req.body.name,
  };
  Client.create(data, (err, client) => {
    if (err) return next(res.error(400, err.message));

    let image = req.files.image;
    //mkdirp.sync('./public/assets/clients');
    image.mv(`./public/assets/clients/${client._id}`, err => {
      if (err) return next(err);
      req.flash('success', 'Client created successfully');
      res.redirect('back');
    });
  });
};

exports.getClients = (req, res, next) => {
  Client.find({}, (err, clients) => {
    if (err) return next(err);
    res.json({clients});
  });
};

function saveClientUpdates(req, res, next) {
  req.client.save()
    .then(() => {
      req.flash('success', 'Client updated successfully');
      res.redirect('back');
    })
    .catch(err => next(res.error(400, err.message)));
}

exports.updateClient = (req, res, next) => {
  let hasChange = false;
  if (req.body.name !== req.client.name) {
    req.client.name = req.body.name;
    hasChange = true;
  }
  if (req.files && req.files.image) {
    let image = req.files.image;
    //mkdirp.sync('./public/assets/clients');
    image.mv(`./public/assets/clients/${req.client._id}`, err => {
      if (err) return next(err);
      return saveClientUpdates(req, res, next);
    });
  } else if (hasChange) {
    saveClientUpdates(req, res, next);
  } else {
    res.redirect('back');
  }
};

exports.removeClient = (req, res, next) => {
  req.client.remove()
    .then(() => {
      req.flash('success', 'Client removed successfully');
      res.redirect('back');
    })
    .catch(next);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showClients = (req, res, next) => {
  Client.find({}, {}, {sort:{name: 1}}, (err, clients) => {
    if (err) return next(err);
    res.render('clients/index', {
      title: 'Clients',
      clients
    });
  });
};