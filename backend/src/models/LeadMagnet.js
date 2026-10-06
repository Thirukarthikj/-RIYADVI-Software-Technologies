const mongoose = require('mongoose');

const leadMagnetSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  status: { type: String, enum: ['new', 'downloaded', 'followed-up'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('LeadMagnet', leadMagnetSchema);
