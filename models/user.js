const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({
  email: {type: String, unique: true, trim: true, required: true, match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/},
  password: {type: String, required: true},
  profile: {
    name: {type: String, trim: true, required: true, match: /^[\w\s]+$/},
    image: String,
    title: {type: String, trim: true},
    overview: {type: String, trim: true},
    location: {type: String, trim: true, match: /^\w+, \w+$/}
  },
  competencies: {
    services: [{
      service: {type: mongoose.Schema.Types.ObjectId, ref: 'Services'},
      rate: {type: Number, min: 1, max: 10}
    }],
    skills: [{
      skill: {type: mongoose.Schema.Types.ObjectId, ref: 'Skills'},
      rate: {type: Number, min: 1, max: 10}
    }],
    portfolios: [{
      portfolio: {type: mongoose.Schema.Types.ObjectId, ref: 'Portfolios'},
      description: String
    }]
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

// TODO: schema.pre('update' ....) should update salted password

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, cb);
};

const model = mongoose.model('Users', schema);
module.exports = model;