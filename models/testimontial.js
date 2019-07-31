const mongoose = require('mongoose');
const fs = require('fs');

const schema = new mongoose.Schema({
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'Clients'},
  feedback: {type: String, required: true}
});

schema.pre('find', function() {
  this.populate('client');
});

const model = mongoose.model('Testimontials', schema);
module.exports = model;