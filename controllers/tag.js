const TagModel = require('../models/tag');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createTag = (req, res, next) => {
  var data = {
    title: req.body.title,
    description: req.body.description
  };

  TagModel.create(data, (err, tag) => {
    if (err) return next(res.error(400, err));
    res.json({message: 'Tag created successfully'});
  });
};

exports.getTags = (req, res, next) => {
  TagModel.get({}, (err, tags) => {
    if (err) return next(res.error(400, err));
    res.json({tags: tags});
  });
};

exports.updateTag = (req, res, next) => {
  var data = {
    title: req.body.title,
    description: req.body.description
  };

  TagModel.update({_id: req.params.id}, data, (err, tag) => {
    if (err) return next(res.error(400, err));
    res.json({message: 'Tag updated successfully'});
  });
};

exports.removeTag = (req, res, next) => {
  TagModel.delete({_id: req.params.id}, (err, tag) => {
    if (err) return next(res.error(400, err));
    res.json({message: 'Tag deleted successfully'});
  });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showTags = (req, res, next) => {
  TagModel.get({}, (err, tags) => {
    if (err) return next(res.error(400, err));
    res.render('tags/index', {tags: tags});
  });
};