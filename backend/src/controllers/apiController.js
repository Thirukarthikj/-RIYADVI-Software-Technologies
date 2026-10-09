const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const Consultation = require('../models/Consultation');
const HealthCheckup = require('../models/HealthCheckup');
const LeadMagnet = require('../models/LeadMagnet');
const Application = require('../models/Application');
const inMemoryStore = require('../utils/inMemoryStore');

// Helper: Check if active MongoDB connection is open
const isDbConnected = () => mongoose.connection.readyState === 1;

// Helper: standard API response
const apiResponse = (res, statusCode, success, message, data = null) => {
  const response = { success, message };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

// POST /api/contact
exports.createContact = async (req, res) => {
  try {
    if (isDbConnected()) {
      const contact = await Contact.create(req.body);
      return apiResponse(res, 201, true, 'Thank you for reaching out! We will get back to you shortly.', contact);
    }
    const newContact = {
      _id: 'mem_' + Date.now(),
      ...req.body,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.contacts.unshift(newContact);
    return apiResponse(res, 201, true, 'Thank you for reaching out! We will get back to you shortly.', newContact);
  } catch (error) {
    console.error('Contact Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// POST /api/consultation
exports.createConsultation = async (req, res) => {
  try {
    if (isDbConnected()) {
      const consultation = await Consultation.create(req.body);
      return apiResponse(res, 201, true, 'Consultation request received! Our team will contact you to schedule.', consultation);
    }
    const newCons = {
      _id: 'mem_' + Date.now(),
      ...req.body,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.consultations.unshift(newCons);
    return apiResponse(res, 201, true, 'Consultation request received! Our team will contact you to schedule.', newCons);
  } catch (error) {
    console.error('Consultation Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// POST /api/health-checkup
exports.createHealthCheckup = async (req, res) => {
  try {
    if (isDbConnected()) {
      const checkup = await HealthCheckup.create(req.body);
      return apiResponse(res, 201, true, 'Business Health Checkup submitted! You will receive your report shortly.', checkup);
    }
    const newHc = {
      _id: 'mem_' + Date.now(),
      ...req.body,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.healthCheckups.unshift(newHc);
    return apiResponse(res, 201, true, 'Business Health Checkup submitted! You will receive your report shortly.', newHc);
  } catch (error) {
    console.error('Health Checkup Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// POST /api/lead-magnet
exports.createLeadMagnet = async (req, res) => {
  try {
    if (isDbConnected()) {
      const lead = await LeadMagnet.create(req.body);
      return apiResponse(res, 201, true, 'Thank you! Your download link has been sent.', lead);
    }
    const newLead = {
      _id: 'mem_' + Date.now(),
      ...req.body,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.leadMagnets.unshift(newLead);
    return apiResponse(res, 201, true, 'Thank you! Your download link has been sent.', newLead);
  } catch (error) {
    console.error('Lead Magnet Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// POST /api/applications
exports.createApplication = async (req, res) => {
  try {
    const applicationData = { ...req.body };
    if (req.file) {
      applicationData.resumeUrl = `/uploads/${req.file.filename}`;
      applicationData.resumeFilename = req.file.originalname;
    }
    if (isDbConnected()) {
      const application = await Application.create(applicationData);
      return apiResponse(res, 201, true, 'Application submitted successfully! We will review and get back to you.', application);
    }
    const newApp = {
      _id: 'mem_' + Date.now(),
      ...applicationData,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    inMemoryStore.applications.unshift(newApp);
    return apiResponse(res, 201, true, 'Application submitted successfully! We will review and get back to you.', newApp);
  } catch (error) {
    console.error('Application Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
    if (isDbConnected()) {
      const [contacts, consultations, healthCheckups, leadMagnets, applications] = await Promise.all([
        Contact.countDocuments(),
        Consultation.countDocuments(),
        HealthCheckup.countDocuments(),
        LeadMagnet.countDocuments(),
        Application.countDocuments(),
      ]);
      return apiResponse(res, 200, true, 'Dashboard data', {
        totalEnquiries: contacts,
        consultationRequests: consultations,
        healthCheckupLeads: healthCheckups,
        leadMagnetLeads: leadMagnets,
        jobApplications: applications,
      });
    }
    return apiResponse(res, 200, true, 'Dashboard data', {
      totalEnquiries: inMemoryStore.contacts.length,
      consultationRequests: inMemoryStore.consultations.length,
      healthCheckupLeads: inMemoryStore.healthCheckups.length,
      leadMagnetLeads: inMemoryStore.leadMagnets.length,
      jobApplications: inMemoryStore.applications.length,
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    return apiResponse(res, 500, false, 'Failed to fetch dashboard data.');
  }
};

// GET /api/admin/enquiries
exports.getEnquiries = async (req, res) => {
  try {
    if (isDbConnected()) {
      const enquiries = await Contact.find().sort({ createdAt: -1 });
      return apiResponse(res, 200, true, 'Enquiries fetched', enquiries);
    }
    return apiResponse(res, 200, true, 'Enquiries fetched', inMemoryStore.contacts);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch enquiries.');
  }
};

// GET /api/admin/consultations
exports.getConsultations = async (req, res) => {
  try {
    if (isDbConnected()) {
      const consultations = await Consultation.find().sort({ createdAt: -1 });
      return apiResponse(res, 200, true, 'Consultations fetched', consultations);
    }
    return apiResponse(res, 200, true, 'Consultations fetched', inMemoryStore.consultations);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch consultations.');
  }
};

// GET /api/admin/health-checkups
exports.getHealthCheckups = async (req, res) => {
  try {
    if (isDbConnected()) {
      const checkups = await HealthCheckup.find().sort({ createdAt: -1 });
      return apiResponse(res, 200, true, 'Health checkups fetched', checkups);
    }
    return apiResponse(res, 200, true, 'Health checkups fetched', inMemoryStore.healthCheckups);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch health checkups.');
  }
};

// GET /api/admin/lead-magnets
exports.getLeadMagnets = async (req, res) => {
  try {
    if (isDbConnected()) {
      const leads = await LeadMagnet.find().sort({ createdAt: -1 });
      return apiResponse(res, 200, true, 'Lead magnets fetched', leads);
    }
    return apiResponse(res, 200, true, 'Lead magnets fetched', inMemoryStore.leadMagnets);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch lead magnets.');
  }
};

// GET /api/admin/applications
exports.getApplications = async (req, res) => {
  try {
    if (isDbConnected()) {
      const applications = await Application.find().sort({ createdAt: -1 });
      return apiResponse(res, 200, true, 'Applications fetched', applications);
    }
    return apiResponse(res, 200, true, 'Applications fetched', inMemoryStore.applications);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch applications.');
  }
};

// PATCH /api/admin/enquiries/:id/status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (isDbConnected()) {
      const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!contact) return apiResponse(res, 404, false, 'Enquiry not found.');
      return apiResponse(res, 200, true, 'Status updated', contact);
    }
    const item = inMemoryStore.contacts.find((c) => c._id === req.params.id);
    if (!item) return apiResponse(res, 404, false, 'Enquiry not found.');
    item.status = status;
    return apiResponse(res, 200, true, 'Status updated', item);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to update status.');
  }
};
