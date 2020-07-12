const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  posted_by: { type: String, required: true },
  date_created: { type: Date, required: true },
});

module.exports = mongoose.model('Post', postSchema); 