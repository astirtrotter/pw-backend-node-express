const mongoose = require('mongoose');
const fs = require('fs');

const schema = new mongoose.Schema({
  // image: /assets/clients/:id
  name: {type: String, unique: true, required: true, trim: true, match: /^[\w\s]+$/}
});

schema.post('remove', function () {
  fs.unlink('./public/assets/clients/' + this._id, (err) => {});
});

const model = mongoose.model('Clients', schema);
module.exports = model;