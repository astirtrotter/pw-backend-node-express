const User = require('../models/user');
const Service = require('../models/service');
const Skill = require('../models/skill');
const Portfolio = require('../models/portfolio');
const waterfall = require('async-waterfall');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// api

exports.getUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json({users});
  });
};

function redirectWithTab(req, res) {
  let backUrl = `/users/${req.usr._id}?cur_tab=` + req.body.cur_tab;
  res.redirect(backUrl);
}

function saveUserUpdates(req, res, next) {
  req.usr.save()
    .then(() => {
      req.flash('success', 'User updated successfully');
      redirectWithTab(req, res);
    })
    .catch(err => next(res.error(400, err.message)));
}

exports.updateUser = (req, res, next) => {
  if ('general' === req.body.cur_tab) {
    if (req.body.name) req.usr.profile.name = req.body.name;
    if (req.body.location) req.usr.profile.location = req.body.location;
    if (req.body.title) req.usr.profile.title = req.body.title;
    if (req.body.overview) req.usr.profile.overview = req.body.overview;
    if (req.body.allowed) req.usr.meta.allowed = req.body.allowed;

    if (req.files && req.files.image) {
      let image = req.files.image;
      let path = `./public/assets/users/${req.usr._id}`;
      image.mv(`${path}/portrait`, err => {});
      saveUserUpdates(req, res, next);
    } else {
      return saveUserUpdates(req, res, next);
    }
  } else if ('security' === req.body.cur_tab) {
    req.usr.comparePassword(req.body.old_password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) {
        req.flash('error', 'Old password is incorrect');
        return redirectWithTab(req, res);
      }
      req.usr.password = req.body.password;
      saveUserUpdates(req, res, next);
    })
  } else if ('competencies' === req.body.cur_tab) {
    req.usr.competencies = {
      skills: req.body.skills,
      services: req.body.services,
      portfolios: req.body.portfolios
    };
    saveUserUpdates(req, res, next);
  } else if ('histories' === req.body.cur_tab) {
    req.usr.histories = req.usr.histories || {};
    req.usr.histories.works = req.usr.histories.works || [];
    req.usr.histories.educations = req.usr.histories.educations || [];

    if (req.body.historyType === 'work') {
      let works = req.usr.histories.works;
      let work = {
        name: req.body.workName,
        position: req.body.workPosition,
        since: new Date(req.body.workSince),
        description: req.body.workDescription,
      };
      if (req.body.workUntil && req.body.workUntil.length > 0) work.until = new Date(req.body.workUntil);

      let index = parseInt(req.body.workIndex);
      if (index === -1) {
        works.push(work);
      } else {
        works[index] = work;
      }
    } else {
      let educations = req.usr.histories.educations;
      let education = {
        name: req.body.eduName,
        degree: req.body.eduDegree,
        since: new Date(req.body.eduSince),
        description: req.body.eduDescription,
      };
      if (req.body.eduUntil && req.body.eduUntil.length > 0) education.until = new Date(req.body.eduUntil);

      let index = parseInt(req.body.eduIndex);
      if (index === -1) {
        educations.push(education);
      } else {
        educations[index] = education;
      }
    }
    console.log(req.usr.histories);
    saveUserUpdates(req, res, next);
  } else {
    return next(res.error(400, 'Unknown update request'));
  }
};

exports.removeUser = (req, res, next) => {
  if (req.usr.meta.admin) {
    req.flash('error', 'Superuser cannot be removed');
    return res.redirect('back');
  }
  req.usr.remove()
    .then(() => {
      req.flash('success', 'User removed successfully');
      res.redirect('back');
    })
    .catch(next);
};

exports.removeUserWork = (req, res, next) => {
  let index = parseInt(req.query.workIndex);
  req.usr.histories.works.splice(index, 1);
  req.body.cur_tab = 'histories';
  saveUserUpdates(req, res, next);
};

exports.removeUserEducation = (req, res, next) => {
  let index = parseInt(req.query.eduIndex);
  req.usr.histories.educations.splice(index, 1);
  req.body.cur_tab = 'histories';
  saveUserUpdates(req, res, next);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// views

exports.showUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render('users/index', {
      title: 'Users',
      users
    });
  });
};

exports.showUser = (req, res, next) => {
  waterfall([
    function (callback) {
      Service.find().then(services => callback(null, services));
    },
    function (services, callback) {
      Skill.find({}, {}, {sort: {type: 1, name: 1}}).then(skills => callback(null, services, skills));
    },
    function (services, skills, callback) {
      Portfolio.find({}, {}, {sort: {name: 1}}).then(portfolios => callback(null, services, skills, portfolios));
    },
    function (services, skills, portfolios, callback) {
      let data = {
        title: 'Edit User',
        usr: req.usr,
        cur_tab: req.query.cur_tab || 'general',
        services,
        skills,
        portfolios
      };
      callback(null, data);
    }
  ], (err, data) => {
    if (err) return next(err);
    res.render('users/edit', data);
  });
};

exports.getUser = function (req, res, next) {
  res.json({
    user: req.usr
  });
};