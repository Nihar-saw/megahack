const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false,
  },
  profileImage: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: 'Student',
  },
  location: {
    type: String,
    default: 'India',
  },
  assessmentProgress: {
    type: Number,
    default: 1,
  },
  currentCourseId: {
    type: String,
    default: 'default',
  },
  completedDays: {
    type: Map,
    of: Number,
    default: {
      'data-science': 0,
      'web-development': 0,
      'ui-ux': 0,
    }
  },
  performanceScores: {
    type: Map,
    of: [Number],
    default: {
      'data-science': [],
      'web-development': [],
      'ui-ux': [],
    }
  },
  assessmentRemarks: {
    type: Map,
    of: [String],
    default: {
      'data-science': [],
      'web-development': [],
      'ui-ux': [],
    }
  },
  interviewScores: {
    type: Map,
    of: [Number],
    default: {
      'data-science': [],
      'web-development': [],
      'ui-ux': [],
    }
  },
  portfolioCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
