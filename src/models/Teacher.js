const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: {
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
    phone: {
      type: String,
      minlength: 1,
      match: /[0-9]/g,
      trim: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subRole: {
      type: String,
      lowercase: true,
      enum: ['admin', 'teacher'],
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
    },
    grade: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    lastGradeUpdatedAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Teacher', schema)
