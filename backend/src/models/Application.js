const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  position: { type: String, required: true, trim: true },
  resumeUrl: { type: String, trim: true },
  resumeFilename: { type: String, trim: true },
  coverLetter: { type: String },
  experience: { type: String, trim: true },
  portfolio: { type: String, trim: true },
  status: { type: String, enum: ['new', 'reviewing', 'shortlisted', 'interviewed', 'hired', 'rejected'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
