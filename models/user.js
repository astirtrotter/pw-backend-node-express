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
      trim: true,
      required: 'About is required'
    },
    location: {
      type: String,
      trim: true,
      required: 'Location is required',
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

schema.pre('save', (next) => {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, process.env.PASSWORD_SALT)
    .then((password) => {
      user.password = password;
      next();
    })
    .catch((err) => next(err));
});

schema.methods.comparePassword = (candidatePassword, next) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err);
    next(null, isMatch);
  });
};

schema.statics = {
  create: (data, cb) => {
    var user = new model(data);
    user.save(cb);
  },

  get: (query, cb) => {
    model.find(query, cb);
  },

  update: (query, updateData, cb) => {
    model.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
  },

  delete: (query, cb) => {
    model.findOneAndDelete(query, cb);
  }
};

const model = mongoose.model('Users', schema);
module.exports = model;