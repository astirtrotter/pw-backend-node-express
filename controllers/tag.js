const Tag = require('../models/tag');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createTag = (req, res, next) => {
  let data = {
    title: req.body.title,
    description: req.body.description
  };
  let tag = new Tag(data);
  tag.save((err, tag) => {
    if (err) return next(err);
    res.json({message: 'Tag created successfully'});
  });
};

exports.getTags = (req, res, next) => {
  Tag.find({}, (err, tags) => {
    if (err) return next(err);
    res.json({tags: tags});
  });
};

exports.updateTag = (req, res, next) => {
  let data = {
    title: req.body.title,
    description: req.body.description
  };

  Tag.findOneAndUpdate({_id: req.params.id}, {$set: data}, {new: true}, (err, tag) => {
    if (err) return next(err);
    res.json({message: 'Tag updated successfully'});
  });
};

exports.removeTag = (req, res, next) => {
  Tag.findOneAndDelete({_id: req.params.id}, (err, tag) => {
    if (err) return next(err);
    res.json({message: 'Tag deleted successfully'});
  });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showTags = (req, res, next) => {
  Tag.find({}, (err, tags) => {
    if (err) return next(err);
    res.render('tags/index', {
      title: 'Tags',
      user: req.user,
      tags: tags
    });
  });
};