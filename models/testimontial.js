const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'Clients'},
  feedback: {type: String, required: true}
});

schema.pre('find', function() {
  this.populate('client');
});

schema.post('init', function(doc) {
  doc.feedback = doc.feedback.replace('{{name}}', doc.client.name);
});

const model = mongoose.model('Testimontials', schema);
module.exports = model;