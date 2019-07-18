const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: 'Email is required',
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: String,
  profile: {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      match: [/^[\w\s]+$/, 'Please fill a valid name']
    },
    overview: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true,
      match: [/^\w+, \w+$/, 'Please fill a valid location']
    },
    skills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skills'
    }],
    portfolios: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolios'
    }],
    clients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clients'
    }],
    testimonials: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Testimonials'
    }]
  },
  meta: {
    admin: {type: Boolean, default: false},
    lock: {type: Boolean, default: false}
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

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, cb);
};

const model = mongoose.model('Users', schema);
module.exports = model;