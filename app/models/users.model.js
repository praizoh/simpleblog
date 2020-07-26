const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
  firstname: { type: String, required: true }, 
  lastname: { type: String, required: true }, 
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default:false,required: true },
  posts : [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  date_created: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('User', postSchema);  