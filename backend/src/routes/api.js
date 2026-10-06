const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const controller = require('../controllers/apiController');
const handleValidationErrors = require('../middleware/errorHandler');
const {
  contactValidation,
  consultationValidation,
  healthCheckupValidation,
  leadMagnetValidation,
  applicationValidation,
} = require('../middleware/validators');

// Multer config for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only PDF, DOC, and DOCX files are allowed.'));
  },
});

// Public API routes
router.post('/contact', contactValidation, handleValidationErrors, controller.createContact);
router.post('/consultation', consultationValidation, handleValidationErrors, controller.createConsultation);
router.post('/health-checkup', healthCheckupValidation, handleValidationErrors, controller.createHealthCheckup);
router.post('/lead-magnet', leadMagnetValidation, handleValidationErrors, controller.createLeadMagnet);
router.post('/applications', upload.single('resume'), applicationValidation, handleValidationErrors, controller.createApplication);

// Admin API routes
router.get('/admin/dashboard', controller.getDashboard);
router.get('/admin/enquiries', controller.getEnquiries);
router.get('/admin/consultations', controller.getConsultations);
router.get('/admin/health-checkups', controller.getHealthCheckups);
router.get('/admin/lead-magnets', controller.getLeadMagnets);
router.get('/admin/applications', controller.getApplications);
router.patch('/admin/enquiries/:id/status', controller.updateEnquiryStatus);

module.exports = router;
