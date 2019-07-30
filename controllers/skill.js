const Skill = require('../models/skill');
const mkdirp = require('mkdirp');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createSkill = (req, res, next) => {
  if (!req.files || !req.files.image) return next(res.error(400, 'Image is required'));

  let data = {
    name: req.body.name,
    type: req.body.type
  };
  Skill.create(data, (err, skill) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }

    let image = req.files.image;
    mkdirp.sync('./public/assets/skills');
    image.mv(`./public/assets/skills/${skill._id}`, err => {
      if (err) return next(err);
      req.flash('success', 'Skill created successfully');
      res.redirect('back');
    });
  });
};

exports.getSkills = (req, res, next) => {
  Skill.find({}, (err, skills) => {
    if (err) return next(err);
    res.json({skills});
  });
};

exports.updateSkill = (req, res, next) => {
  // todo
};

exports.removeSkill = (req, res, next) => {
  req.skill.remove()
    .then(() => {
      req.flash('success', 'Skill removed successfully');
      res.redirect('back');
    })
    .catch(next);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showSkills = (req, res, next) => {
  Skill.find({}, (err, skills) => {
    if (err) return next(err);
    res.render('skills/index', {
      title: 'Skills',
      skills
    });
  });
};