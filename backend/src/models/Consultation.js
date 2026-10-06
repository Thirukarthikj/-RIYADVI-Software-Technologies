const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  service: { type: String, trim: true },
  budget: { type: String, trim: true },
  timeline: { type: String, trim: true },
  message: { type: String },
  status: { type: String, enum: ['new', 'scheduled', 'completed', 'cancelled'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
