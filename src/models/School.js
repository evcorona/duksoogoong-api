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
    address: {
      type: {
        address: {
          type: String,
          minlength: 1,
          lowercase: true,
          trim: true,
          required: true,
        },
        state: {
          type: String,
          minlength: 1,
          lowercase: true,
          trim: true,
          required: true,
        },
        city: {
          type: String,
          minlength: 1,
          lowercase: true,
          trim: true,
          required: true,
        },
        zipCode: {
          type: String,
          minlength: 1,
          maxlength: 6,
          match: /[0-9]/g,
          trim: true,
          required: true,
        },
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
)

schema.index({ name: 1 })

module.exports = mongoose.model('School', schema)
