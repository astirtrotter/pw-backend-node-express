const TagModel = require('../models/tag');

exports.showTags = (req, res, next) => {
  TagModel.get({}, (err, tags) => {
    if (err) return res.status(400).json({error: err});
    res.render('/tags/index', {tags: tags});
  });
};