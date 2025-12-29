const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  audit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audit',
    required: true
  },
  type: {
    type: String,
    enum: ['documentation_review', 'system_testing', 'interview', 'observation', 'data_analysis', 'vulnerability_scan', 'compliance_check'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'blocked', 'cancelled'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timeline: {
    dueDate: {
      type: Date,
      required: true
    },
    estimatedHours: {
      type: Number,
      min: 0
    },
    actualHours: {
      type: Number,
      min: 0
    },
    startedAt: Date,
    completedAt: Date
  },
  dependencies: [{
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    type: {
      type: String,
      enum: ['finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish'],
      default: 'finish_to_start'
    }
  }],
  checklist: [{
    item: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date,
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  }],
  workPapers: [{
    name: String,
    path: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  findings: [{
    description: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    recommendation: String,
    evidence: [String]
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [String],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
taskSchema.index({ audit: 1 });
taskSchema.index({ assignedTo: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ 'timeline.dueDate': 1 });
taskSchema.index({ priority: 1 });

// Virtual for overdue status
taskSchema.virtual('isOverdue').get(function() {
  if (this.status === 'completed') return false;
  return new Date() > this.timeline.dueDate;
});

// Virtual for completion percentage based on checklist
taskSchema.virtual('checklistProgress').get(function() {
  if (!this.checklist || this.checklist.length === 0) return 0;
  const completed = this.checklist.filter(item => item.completed).length;
  return Math.round((completed / this.checklist.length) * 100);
});

// Pre-save middleware to update progress based on checklist
taskSchema.pre('save', function(next) {
  if (this.checklist && this.checklist.length > 0) {
    const completed = this.checklist.filter(item => item.completed).length;
    this.progress = Math.round((completed / this.checklist.length) * 100);
    
    // Auto-complete task if all checklist items are done
    if (this.progress === 100 && this.status !== 'completed') {
      this.status = 'completed';
      this.timeline.completedAt = new Date();
    }
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);