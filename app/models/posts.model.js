const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  posted_by: { type: String, required: true },
  complaint_id: { type: String, required: true }, 
  date_created: { type: Date, required: true },
});

module.exports = mongoose.model('Complaint', complaintSchema); 