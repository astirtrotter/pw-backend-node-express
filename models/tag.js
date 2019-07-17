const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: 'Name is required',
    trim: true,
    match: [/^[\w\s._]+$/, 'Please fill a valid tag name']
  },
  color: {
    type:Number,
    default: 0,
    max: 0xFFFFFF
  },
  description: String
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

const model = mongoose.model('Tags', schema);
module.exports = model;