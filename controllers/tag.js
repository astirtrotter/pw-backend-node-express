const TagModel = require('../models/tag');

exports.createTag = (req, res, next) => {
  var data = {
    title: req.body.title,
    description: req.body.description
  };

  TagModel.create(data, (err, tag) => {
    if (err) return res.status(400).json({error: err});
    res.json({message: 'Tag created successfully'});
  });
};

exports.getTags = (req, res, next) => {
  TagModel.get({}, (err, tags) => {
    if (err) return res.status(400).json({error: err});
    res.json({tags: tags});
  });
};

exports.updateTag = (req, res, next) => {
  var data = {
    title: req.body.title,
    description: req.body.description
  };

  TagModel.update({_id: req.params.id}, data, (err, tag) => {
    if (err) return res.status(400).json({error: err});
    res.json({message: 'Tag updated successfully'});
  });
};

exports.removeTag = (req, res, next) => {
  TagModel.delete({_id: req.params.id}, (err, tag) => {
    if (err) return res.status(400).json({error: err});
    res.json({message: 'Tag deleted successfully'});
  });
};
