const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
  subject: { type: String, required: true }, 
  body: { type: String, required: true },
  posted_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  categories:[{type: Schema.Types.Array, required:true}],
  date_created: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('Post', postSchema);  