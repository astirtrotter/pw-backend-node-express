const Skill = require('../models/skill');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.createSkill = (req, res, next) => {
  let data = {
    title: req.body.title,
    description: req.body.description
  };
  let skill = new Skill(data);
  skill.save((err, skill) => {
    if (err) return next(err);
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
  let data = {
    title: req.body.title,
    description: req.body.description
  };

  Skill.findOneAndUpdate({_id: req.params.id}, {$set: data}, {new: true}, (err, skill) => {
    if (err) return next(err);
    req.flash('success', 'Skill updated successfully');
    res.redirect('/skills');
  });
};

exports.removeSkill = (req, res, next) => {
  Skill.findOneAndDelete({_id: req.params.id}, (err, skill) => {
    if (err) return next(err);
    req.flash('success', 'Skill removed successfully');
    res.redirect('/skills');
  });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showSkills = (req, res, next) => {
  Skill.find({}, (err, skills) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/');
    }
    res.render('skills/index', {
      title: 'Skills',
      skills
    });
  });
};

exports.showSkill = (req, res, next) => {
  Skill.findById(req.params.id, (err, skill) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/skills');
    }
    res.render('skills/edit', {
      title: 'Edit Skill',
      skill
    });
  });
};

exports.showCreateSkill = (req, res, next) => {
  res.render('skills/create', {
    title: 'Create Skill'
  });
};