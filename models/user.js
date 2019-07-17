const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: 'Email is required',
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    match: [/^[\w\s]+$/, 'Please fill a valid name']
  },
  about: {
    type: String,
    trim: true,
    required: 'About is required'
  },
  salt_password: String,
  location: {
    type: String,
    trim: true,
    required: 'Location is required',
    match: [/^\w+, \w+$/, 'Please fill a valid location']
  },
  meta: {
    admin: {type: Boolean, default: false},
    lock: {type: Boolean, default: false}
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
  testimontials: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Testimonials'
  }]
}, {
  timestamps: true
});

schema.statics = {
  create: (data, cb) => {
    var tag = new model(data);
    tag.save(cb);
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