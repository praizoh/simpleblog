const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const postSchema = mongoose.Schema({
  category: { type: String, required: true },
  date_created: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('Category', postSchema);  