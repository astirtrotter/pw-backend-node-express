const Skill = require('../models/skill');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createSkill = (req, res, next) => {
  let data = {
    name: req.body.name,

  };
  Skill.create(data, (err, skill) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    req.flash('success', 'Skill created successfully');
    res.redirect('/skills');
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