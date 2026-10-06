const Contact = require('../models/Contact');
const Consultation = require('../models/Consultation');
const HealthCheckup = require('../models/HealthCheckup');
const LeadMagnet = require('../models/LeadMagnet');
const Application = require('../models/Application');

// Helper: standard API response
const apiResponse = (res, statusCode, success, message, data = null) => {
  const response = { success, message };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

// POST /api/contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    return apiResponse(res, 201, true, 'Thank you for reaching out! We will get back to you shortly.', contact);
  } catch (error) {
    console.error('Contact Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// POST /api/consultation
exports.createConsultation = async (req, res) => {
  try {
    const consultation = await Consultation.create(req.body);
    return apiResponse(res, 201, true, 'Consultation request received! Our team will contact you to schedule.', consultation);
  } catch (error) {
    console.error('Consultation Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// POST /api/health-checkup
exports.createHealthCheckup = async (req, res) => {
  try {
    const checkup = await HealthCheckup.create(req.body);
    return apiResponse(res, 201, true, 'Business Health Checkup submitted! You will receive your report shortly.', checkup);
  } catch (error) {
    console.error('Health Checkup Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// POST /api/lead-magnet
exports.createLeadMagnet = async (req, res) => {
  try {
    const lead = await LeadMagnet.create(req.body);
    return apiResponse(res, 201, true, 'Thank you! Your download link has been sent.', lead);
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
    const application = await Application.create(applicationData);
    return apiResponse(res, 201, true, 'Application submitted successfully! We will review and get back to you.', application);
  } catch (error) {
    console.error('Application Error:', error);
    return apiResponse(res, 500, false, 'Something went wrong. Please try again later.');
  }
};

// GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Dashboard Error:', error);
    return apiResponse(res, 500, false, 'Failed to fetch dashboard data.');
  }
};

// GET /api/admin/enquiries
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Contact.find().sort({ createdAt: -1 });
    return apiResponse(res, 200, true, 'Enquiries fetched', enquiries);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch enquiries.');
  }
};

// GET /api/admin/consultations
exports.getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    return apiResponse(res, 200, true, 'Consultations fetched', consultations);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch consultations.');
  }
};

// GET /api/admin/health-checkups
exports.getHealthCheckups = async (req, res) => {
  try {
    const checkups = await HealthCheckup.find().sort({ createdAt: -1 });
    return apiResponse(res, 200, true, 'Health checkups fetched', checkups);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch health checkups.');
  }
};

// GET /api/admin/lead-magnets
exports.getLeadMagnets = async (req, res) => {
  try {
    const leads = await LeadMagnet.find().sort({ createdAt: -1 });
    return apiResponse(res, 200, true, 'Lead magnets fetched', leads);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch lead magnets.');
  }
};

// GET /api/admin/applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    return apiResponse(res, 200, true, 'Applications fetched', applications);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to fetch applications.');
  }
};

// PATCH /api/admin/enquiries/:id/status
exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) return apiResponse(res, 404, false, 'Enquiry not found.');
    return apiResponse(res, 200, true, 'Status updated', contact);
  } catch (error) {
    return apiResponse(res, 500, false, 'Failed to update status.');
  }
};
