const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const rimraf = require('rimraf');

const schema = new mongoose.Schema({
  // image: /assets/users/:id/portrait
  email: {type: String, unique: true, trim: true, required: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/},
  password: {type: String, required: true},
  profile: {
    name: {type: String, trim: true, required: true, match: /^[\w\s]+$/},
    title: {type: String, trim: true},
    overview: {type: String, trim: true},
    location: {type: String, trim: true, match: /^\w+, \w+$/}
  },
  competencies: {
    services: [{type: mongoose.Schema.Types.ObjectId, ref: 'Services'}],
    skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skills'}],
    portfolios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Portfolios'}]
  },
  histories: {
    educations: [{
      name: String,
      since: Date,
      until: Date,
      degree: String
    }],
    works: [{
      name: String,
      since: Date,
      until: Date,
      position: String,
      description: String
    }]
  },
  meta: {
    admin: {type: Boolean, default: false},
    allowed: {type: Boolean, default: false}
  }
}, {
  timestamps: true
});

schema.pre('find', function () {
  this.populate('competencies.services');
  this.populate('competencies.skills');
  this.populate('competencies.portfolios');
});

schema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt)
      .then((password) => {
        user.password = password;
        next();
      })
      .catch(next);
  });
});

schema.post('remove', function () {
  rimraf('./public/assets/users/' + this._id, () => {});
});

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, cb);
};

const model = mongoose.model('Users', schema);
module.exports = model;