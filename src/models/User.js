const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gim,
      minlength: 5,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      lowercase: true,
      enum: ['student', 'tutor', 'teacher', 'admin', 'main'],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    isInitialSetup: {
      type: Boolean,
      default: true,
      required: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  { timestamps: true }
)

schema.index({ email: 1 })

module.exports = mongoose.model('User', schema)
