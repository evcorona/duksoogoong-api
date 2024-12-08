const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    birthDate: {
      type: Date,
      required: true,
      validate: {
        validator: value => value <= new Date(),
        message: 'Birth date cannot be in the future',
      },
    },
    civilStatus: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    curp: {
      type: String,
      uppercase: true,
      trim: true,
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    grade: {
      type: {
        value: {
          type: Number,
          min: 0,
          max: 10,
          required: true,
        },
        level: {
          type: String,
          minlength: 1,
          enum: ['kup', 'poom', 'dan'],
          required: true,
        },
        lastGradeUpdatedAt: {
          type: Date,
        },
      },
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    lastName: {
      type: String,
      minlength: 1,
      lowercase: true,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      minlength: 1,
      lowercase: true,
      trim: true,
      required: true,
    },
    occupation: {
      type: String,
      minlength: 1,
      lowercase: true,
      trim: true,
      required: true,
    },
    priorExperienceDays: {
      type: Number,
      min: 0,
      default: 0,
      required: true,
    },
    ruf: {
      type: String,
      minlength: 1,
      uppercase: true,
      trim: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    tutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tutor',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    address: {
      type: {
        address: {
          type: String,
          minlength: 1,
          lowercase: true,
          trim: true,
        },
        state: {
          type: String,
          minlength: 1,
          lowercase: true,
          trim: true,
        },
        city: {
          type: String,
          minlength: 1,
          lowercase: true,
          trim: true,
        },
        zipCode: {
          type: String,
          minlength: 1,
          maxlength: 6,
          match: /[0-9]/g,
          trim: true,
        },
      },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Student', schema)
