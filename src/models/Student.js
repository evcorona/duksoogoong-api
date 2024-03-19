const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 1,
      lowercase: true,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 1,
      lowercase: true,
      trim: true,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    level: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    grade: {
      type: String,
      minlength: 1,
      enum: ['kup', 'pum', 'dan'],
      required: true,
    },
    lastGradeUpdated: {
      type: Date,
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Student', schema)
