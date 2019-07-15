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
    var tag = new this(data);
    tag.save(cb);
  },

  get: (query, cb) => {
    this.find(query, cb);
  },

  update: (query, updateData, cb) => {
    this.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
  },

  delete: (query, cb) => {
    this.findOneAndDelete(query, cb);
  }
};

const tagModel = mongoose.model('Tags', tagSchema);
module.exports = tagModel;