const mongoose = require('mongoose');
const fs = require('fs');

const schema = new mongoose.Schema({
  header: {
    title: {type: String, unique: true, required: true, trim: true, match: /^[\w\s.-]+$/},
    description: String
  },
  description: {
    //image: /assets/services/:id/description
    title: String,
    subtitle: String,
    overview: String
  },
  workflow: {
    // image: /assets/services/:id/workflow
    parts: [{
      title: String,
      subtitle: String,
      description: String
    }],
    steps: [String]
  },
  mentalities: [{
    // image: /assets/services/:id/ment1~3
    title: String,
    description: String
  }]
});

schema.post('remove', function () {
  fs.unlink('./public/assets/services/' + this._id, (err) => {});
});

const model = mongoose.model('Services', schema);
module.exports = model;