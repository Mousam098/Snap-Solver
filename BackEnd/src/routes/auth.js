const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/constants');

const router = express.Router();

// Helper function to create JWT token
const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Helper function to create and send token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// @route   POST /auth/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error creating user',
      error: error.message
    });
  }
});

// @route   POST /auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password!'
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // 3) Update last login
    await user.updateLastLogin();

    // 4) If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error during login',
      error: error.message
    });
  }
});

// @route   POST /auth/verify
// @desc    Verify JWT token and get user info
// @access  Private
router.post('/verify', protect, async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Token verification failed',
      error: error.message
    });
  }
});

// @route   GET /auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// @route   PATCH /auth/update-profile
// @desc    Update user profile
// @access  Private
router.patch('/update-profile', protect, async (req, res) => {
  try {
    const { name } = req.body;

    // Fields that are allowed to be updated
    const filteredBody = {};
    if (name) filteredBody.name = name;

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error updating profile',
      error: error.message
    });
  }
});

module.exports = router;