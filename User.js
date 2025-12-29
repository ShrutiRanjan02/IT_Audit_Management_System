const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin', 'audit_manager', 'senior_auditor', 'auditor', 'compliance_officer'],
    default: 'auditor'
  },
  department: {
    type: String,
    trim: true
  },
  permissions: [{
    type: String,
    enum: [
      'create_audit',
      'manage_audits',
      'assign_tasks',
      'view_all_audits',
      'manage_users',
      'generate_reports',
      'manage_compliance',
      'run_vulnerability_scans',
      'view_analytics'
    ]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  profileImage: {
    type: String
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      inApp: { type: Boolean, default: true }
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  }
}, {
  timestamps: true
});

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Transform output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);