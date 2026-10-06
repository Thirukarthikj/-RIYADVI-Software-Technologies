const mongoose = require('mongoose');

const healthCheckupSchema = new mongoose.Schema({
  // Step 1: Business Information
  businessName: { type: String, required: true, trim: true },
  contactName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  industry: { type: String, trim: true },
  companySize: { type: String, trim: true },
  
  // Step 2: Website & Digital Presence
  hasWebsite: { type: Boolean },
  websiteUrl: { type: String, trim: true },
  websitePerformance: { type: String, trim: true },
  mobileResponsive: { type: String, trim: true },
  
  // Step 3: Marketing
  digitalMarketing: { type: [String], default: [] },
  socialMediaPlatforms: { type: [String], default: [] },
  monthlyBudget: { type: String, trim: true },
  
  // Step 4: Technology
  currentTechStack: { type: [String], default: [] },
  painPoints: { type: [String], default: [] },
  
  // Step 5: Business Challenges
  primaryChallenge: { type: String, trim: true },
  growthGoals: { type: String, trim: true },
  timeline: { type: String, trim: true },
  
  // Meta
  score: { type: Number },
  status: { type: String, enum: ['new', 'reviewed', 'contacted', 'converted'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('HealthCheckup', healthCheckupSchema);
