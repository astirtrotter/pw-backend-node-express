const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {type: String, unique: true, required: true, trim: true, match: /^[\w\s.-]+$/},
  image: {type: String, required: true, trim: true},
  combinedSkills: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skills'
  }]
}, {
  timestamps: true
});

const model = mongoose.model('Skills', schema);
module.exports = model;