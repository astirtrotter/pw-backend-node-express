const Skill = require('../models/skill');
//const mkdirp = require('mkdirp');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createSkill = (req, res, next) => {
  if (!req.files || !req.files.image) return next(res.error(400, 'Image is required'));

  let data = {
    name: req.body.name,
    type: req.body.type
  };
  Skill.create(data, (err, skill) => {
    if (err) return next(res.error(400, err.message));

    let image = req.files.image;
    //mkdirp.sync('./public/assets/skills');
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

function saveSkillUpdates(req, res, next) {
  req.skill.save()
    .then(() => {
      req.flash('success', 'Skill updated successfully');
      res.redirect('back');
    })
    .catch(err => next(res.error(400, err.message)));
}

exports.updateSkill = (req, res, next) => {
  let hasChange = false;
  if (req.body.name !== req.skill.name ||
    req.body.type !== req.skill.type) {
    req.skill.name = req.body.name;
    req.skill.type = req.body.type;
    hasChange = true;
  }
  if (req.files && req.files.image) {
    let image = req.files.image;
    //mkdirp.sync('./public/assets/skills');
    image.mv(`./public/assets/skills/${req.skill._id}`, err => {
      if (err) return next(err);
      return saveSkillUpdates(req, res, next);
    });
  } else if (hasChange) {
    saveSkillUpdates(req, res, next);
  } else {
    res.redirect('back');
  }
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
  Skill.find({}, {}, {sort:{type: 1, name: 1}}, (err, skills) => {
    if (err) return next(err);
    res.render('skills/index', {
      title: 'Skills',
      skills
    });
  });
};