const Tag = require('../models/tag');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createTag = (req, res, next) => {
  var data = {
    title: req.body.title,
    description: req.body.description
  };

  Tag.create(data, (err, tag) => {
    if (err) return next(err);
    res.json({message: 'Tag created successfully'});
  });
};

exports.getTags = (req, res, next) => {
  Tag.get({}, (err, tags) => {
    if (err) return next(err);
    res.json({tags: tags});
  });
};

exports.updateTag = (req, res, next) => {
  var data = {
    title: req.body.title,
    description: req.body.description
  };

  Tag.update({_id: req.params.id}, data, (err, tag) => {
    if (err) return next(err);
    res.json({message: 'Tag updated successfully'});
  });
};

exports.removeTag = (req, res, next) => {
  Tag.delete({_id: req.params.id}, (err, tag) => {
    if (err) return next(err);
    res.json({message: 'Tag deleted successfully'});
  });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showTags = (req, res, next) => {
  Tag.get({}, (err, tags) => {
    if (err) return next(err);
    res.render('tags/index', {tags: tags});
  });
};