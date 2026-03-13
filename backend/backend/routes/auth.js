const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// Helper: generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Fallback Mock User for Offline Mode
const MOCK_USER = {
  _id: 'mock-user-id-123',
  name: 'Trial User',
  email: 'admin@example.com',
  password: 'password123',
  location: 'Remote',
  profileImage: '',
  assessmentProgress: 1,
  currentCourseId: 'default',
  completedDays: {},
  performanceScores: {},
  assessmentRemarks: {},
  interviewScores: {},
  portfolioCount: 0,
  createdAt: new Date(),
};

// Helper: build safe user response (no password)
const userResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  location: user.location,
  profileImage: user.profileImage,
  assessmentProgress: user.assessmentProgress,
  currentCourseId: user.currentCourseId,
  completedDays: user.completedDays,
  performanceScores: user.performanceScores,
  assessmentRemarks: user.assessmentRemarks,
  interviewScores: user.interviewScores,
  portfolioCount: user.portfolioCount || 0,
  createdAt: user.createdAt,
});

// ─── POST /api/auth/signup ─────────────────────────────────────────
router.post('/signup', async (req, res) => {
  const dbConnected = req.app.get('dbConnected')();
  
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }

    if (!dbConnected) {
      console.log('📝 Signup attempted in OFFLINE MODE');
      // In offline mode, we just pretend it worked
      const token = generateToken(MOCK_USER._id);
      return res.status(201).json({
        success: true,
        token,
        user: userResponse({ ...MOCK_USER, name, email }),
        message: 'Signed up in offline mode (Database not connected)'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email is already registered' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error during signup: ' + (err.message || 'Unknown error') });
  }
});

router.post('/login', async (req, res) => {
  const dbConnected = req.app.get('dbConnected')();

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (!dbConnected) {
      console.log('🔑 Login attempted in OFFLINE MODE');
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        const token = generateToken(MOCK_USER._id);
        return res.status(200).json({
          success: true,
          token,
          user: userResponse(MOCK_USER),
          message: 'Logged in to mock account (Database offline)'
        });
      } else {
        return res.status(401).json({ 
          success: false, 
          message: 'Offline Mode: Use admin@example.com / password123 to log in while database is disconnected.' 
        });
      }
    }

    // Include password field (select: false by default)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: userResponse(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error during login: ' + (err.message || 'Unknown error') });
  }
});

// ─── GET /api/auth/me  (protected) ────────────────────────────────
router.get('/me', verifyToken, async (req, res) => {
  const dbConnected = req.app.get('dbConnected')();
  
  try {
    if (!dbConnected) {
      return res.status(200).json({ success: true, user: userResponse(MOCK_USER) });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user: userResponse(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ─── PUT /api/auth/profile  (protected) ───────────────────────────
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, location, role, profileImage, assessmentProgress, currentCourseId, completedDays, performanceScores, assessmentRemarks, portfolioCount, interviewScores } = req.body;
    const update = {};
    if (name) update.name = name;
    if (location) update.location = location;
    if (role) update.role = role;
    if (profileImage) update.profileImage = profileImage;
    if (assessmentProgress !== undefined) update.assessmentProgress = assessmentProgress;
    if (currentCourseId !== undefined) update.currentCourseId = currentCourseId;
    if (completedDays !== undefined) update.completedDays = completedDays;
    if (performanceScores !== undefined) update.performanceScores = performanceScores;
    if (assessmentRemarks !== undefined) update.assessmentRemarks = assessmentRemarks;
    if (interviewScores !== undefined) update.interviewScores = interviewScores;
    if (portfolioCount !== undefined) update.portfolioCount = portfolioCount;

    const user = await User.findByIdAndUpdate(req.userId, update, { new: true, runValidators: true });
    res.status(200).json({ success: true, user: userResponse(user) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
