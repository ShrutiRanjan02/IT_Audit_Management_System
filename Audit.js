const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const auditSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  type: {
    type: String,
    enum: ['security', 'compliance', 'operational', 'financial', 'it_general', 'penetration_test'],
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'review', 'completed', 'cancelled'],
    default: 'planning'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  scope: {
    systems: [String],
    departments: [String],
    processes: [String],
    timeframe: {
      start: Date,
      end: Date
    }
  },
  assignedTo: {
    leadAuditor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    team: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['lead', 'senior', 'junior', 'specialist']
      }
    }]
  },
  timeline: {
    plannedStart: {
      type: Date,
      required: true
    },
    plannedEnd: {
      type: Date,
      required: true
    },
    actualStart: Date,
    actualEnd: Date
  },
  compliance: {
    frameworks: [{
      type: String,
      enum: ['SOX', 'PCI_DSS', 'HIPAA', 'GDPR', 'ISO27001', 'NIST', 'COBIT']
    }],
    requirements: [String]
  },
  findings: [{
    title: String,
    description: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    category: String,
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'accepted_risk'],
      default: 'open'
    },
    recommendation: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    dueDate: Date,
    evidence: [String],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  documents: [{
    name: String,
    path: String,
    type: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  budget: {
    allocated: Number,
    spent: Number
  },
  riskAssessment: {
    inherentRisk: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    residualRisk: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    riskFactors: [String]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for performance
auditSchema.index({ status: 1 });
auditSchema.index({ type: 1 });
auditSchema.index({ 'assignedTo.leadAuditor': 1 });
auditSchema.index({ 'timeline.plannedStart': 1 });
auditSchema.index({ createdAt: -1 });

// Virtual for duration
auditSchema.virtual('duration').get(function() {
  if (this.timeline.actualEnd && this.timeline.actualStart) {
    return Math.ceil((this.timeline.actualEnd - this.timeline.actualStart) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Virtual for overdue status
auditSchema.virtual('isOverdue').get(function() {
  if (this.status === 'completed') return false;
  return new Date() > this.timeline.plannedEnd;
});

// Add pagination plugin
auditSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Audit', auditSchema);