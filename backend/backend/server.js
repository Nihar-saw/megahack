require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const evaluateRoutes = require('./routes/evaluate');
const interviewRoutes = require('./routes/interview');

const app = express();

// ─── Middleware ────────────────────────────────────────────────────
app.use(cors()); // More permissive for debugging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/evaluate', evaluateRoutes);
app.use('/api/interview', interviewRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'JobSim API is running!', timestamp: new Date() });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// ─── Connect to MongoDB and start server ──────────────────────────
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobsim';

let dbConnected = false;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    dbConnected = true;
    console.log('✅ MongoDB connected:', MONGO_URI.split('@')[1] ? 'Atlas Cluster' : MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 JobSim API server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed!');
    console.error('   Error Message:', err.message);
    if (err.message.includes('SSL alert number 80')) {
      console.error('   👉 DIAGNOSIS: This usually means your IP address is not whitelisted in MongoDB Atlas.');
      console.error('   👉 FIX: Log in to MongoDB Atlas and add your current IP to "Network Access".');
    }
    
    console.log('⚠️  Starting server in OFFLINE MODE (No database connection)');
    app.listen(PORT, () => {
      console.log(`🚀 JobSim API server running on http://localhost:${PORT} (Database Offline)`);
    });
  });

// Export dbConnected for use in routes if needed
app.set('dbConnected', () => dbConnected);
