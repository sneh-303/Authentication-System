const express = require('express');
const router = express.Router(); // Make sure this is BEFORE using `router`

const authMiddleware = require('../middleware/auth');
const { register, login, profile } = require('../controllers/authController');

const { body, validationResult } = require('express-validator')

// Middleware to check validation result
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return array of validation errors
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation for register route
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 13, max:13 }).withMessage('Password must be at least 13 characters long')
    .matches(/([A-Z].*?){4,}/).withMessage('Password must include 4 uppercase letter')
    .matches(/([a-z].*?){4,}/).withMessage('Password must include 4 lowercase letter')
    .matches(/([0-9].*?){4,}/).withMessage('Password must include 4 number')
    .matches(/[!@#$%^&*]/).withMessage('Password must include a special character'),
];

// Validation for login route (optional, basic checks)
const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];


// Routes
router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/profile', authMiddleware, profile);

module.exports = router;
