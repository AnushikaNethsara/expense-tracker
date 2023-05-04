const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Please add date of birth'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    photo: {
      type: String
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
