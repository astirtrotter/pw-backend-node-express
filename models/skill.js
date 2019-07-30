const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: {type: String, unique: true, required: true, trim: true, match: /^[\w\s.-]+$/},
  image: {type: String, required: true, trim: true},
  type: {type: String, enum: ['Language', 'Library/Framework', 'Platform', 'Tool', 'Database'], required: true}
});

const model = mongoose.model('Skills', schema);
module.exports = model;