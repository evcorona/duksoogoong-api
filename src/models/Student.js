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
    civilStatus: {
      type: String,
      enum: ['married', 'divorced', 'separated', 'single', 'widowed'],
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
    birthDate: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      validate: {
        validator: value => /\d{4}\/\d{2}\/\d{2}/.test(value),
        message: props =>
          `${props.value} is not a valid date in the format YYYY/MM/DD`,
      },
    },
    timePracticing: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    periodTime: {
      type: String,
      minlength: 1,
      enum: ['months', 'years'],
      required: true,
    },
    school: {
      type: String,
      minlength: 1,
      lowercase: true,
      trim: true,
      required: true,
    },
    teacher: {
      type: String,
      minlength: 1,
      lowercase: true,
      trim: true,
      required: true,
    },
    grade: {
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
      required: true,
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
