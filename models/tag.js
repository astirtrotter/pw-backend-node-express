const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
  name: {type: String, unique: true, required: true},
  description: String
}, {
  timestamps: true
});

tagSchema.statics = {
  create: (data, cb) => {
    var tag = new tagModel(data);
    tag.save(cb);
  },

  get: (query, cb) => {
    tagModel.find(query, cb);
  },

  update: (query, updateData, cb) => {
    tagModel.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
  },

  delete: (query, cb) => {
    tagModel.findOneAndDelete(query, cb);
  }
};

const tagModel = mongoose.model('Tags', tagSchema);
module.exports = tagModel;