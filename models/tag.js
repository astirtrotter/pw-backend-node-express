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

const model = mongoose.model('Tags', schema);
module.exports = model;