const mongoose = require('mongoose');
const fs = require('fs');

const schema = new mongoose.Schema({
  name: {type: String, unique: true, required: true, trim: true, match: /^[\w\s.-]+$/},
  description: {type: String, required: true}
});

schema.post('remove', function () {
  fs.unlink('./public/assets/services/' + this._id, (err) => {});
});

const model = mongoose.model('Services', schema);
module.exports = model;