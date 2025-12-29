const mongoose = require('mongoose');

const complianceFrameworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  version: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['regulatory', 'industry', 'internal', 'international'],
    required: true
  },
  applicability: {
    industries: [String],
    regions: [String],
    organizationTypes: [String]
  },
  domains: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    controls: [{
      controlId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: String,
      priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
      },
      testingProcedures: [String],
      evidenceRequirements: [String],
      frequency: {
        type: String,
        enum: ['continuous', 'monthly', 'quarterly', 'semi_annual', 'annual'],
        default: 'annual'
      },
      automatable: {
        type: Boolean,
        default: false
      },
      relatedControls: [String],
      references: [String]
    }]
  }],
  metadata: {
    effectiveDate: Date,
    lastUpdated: Date,
    source: String,
    officialUrl: String,
    tags: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
complianceFrameworkSchema.index({ name: 1, version: 1 });
complianceFrameworkSchema.index({ type: 1 });
complianceFrameworkSchema.index({ 'domains.controls.controlId': 1 });

// Virtual for total controls count
complianceFrameworkSchema.virtual('totalControls').get(function() {
  return this.domains.reduce((total, domain) => total + domain.controls.length, 0);
});

module.exports = mongoose.model('ComplianceFramework', complianceFrameworkSchema);