const mongoose = require('mongoose');
const fs = require('fs');

const schema = new mongoose.Schema({
  name: {type: String, unique: true, required: true, trim: true, match: /^[\w\s.-]+$/},
  type: {type: String, enum: ['Language', 'Library/Framework', 'Platform', 'Tool', 'Database'], required: true}
});

schema.post('remove', function () {
  fs.unlink('./public/assets/skills/' + this._id, (err) => {});
});

const model = mongoose.model('Skills', schema);
module.exports = model;