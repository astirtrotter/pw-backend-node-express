const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  code: {type: String, unique: true, required: true, trim: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
});

schema.pre('findOne', function () {
  this.populate('user');
});

const model = mongoose.model('Tokens', schema);
module.exports = model;