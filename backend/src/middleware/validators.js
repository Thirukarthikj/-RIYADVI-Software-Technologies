const { body } = require('express-validator');

exports.contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('requirement').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

exports.consultationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
  body('service').optional().trim(),
  body('budget').optional().trim(),
  body('timeline').optional().trim(),
  body('message').optional().trim(),
];

exports.healthCheckupValidation = [
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('contactName').trim().notEmpty().withMessage('Contact name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
];

exports.leadMagnetValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('company').optional().trim(),
];

exports.applicationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim(),
  body('position').trim().notEmpty().withMessage('Position is required'),
];
