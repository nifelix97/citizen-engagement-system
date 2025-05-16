const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  message: String,
  agency: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending',
  },
  response: String,
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
