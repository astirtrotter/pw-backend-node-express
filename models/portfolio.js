const mongoose = require('mongoose');
const fs = require('fs');

const schema = new mongoose.Schema({
  // image: /assets/portfolios/:id
  name: {type: String, unique: true, required: true, trim: true},
  description: String,
  services: [{type: mongoose.Schema.Types.ObjectId, ref: 'Services'}],
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skills'}],
  testimontial: {type: mongoose.Schema.Types.ObjectId, ref: 'Testimontials'},
});

schema.pre('find', function() {
  this.populate('services');
  this.populate('skills');
  this.populate('testimontial');
});

schema.post('remove', function () {
  fs.unlink('./public/assets/portfolios/' + this._id, (err) => {});
});

const model = mongoose.model('Portfolios', schema);
module.exports = model;