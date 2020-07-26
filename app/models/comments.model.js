const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
  comment: { type: String, required: true },
  commented_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  post:{type: Schema.Types.ObjectId, ref: 'Post', required: true},
  date_created: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('Comment', postSchema);  