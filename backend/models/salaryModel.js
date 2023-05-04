const mongoose = require('mongoose')

const salarySchema = mongoose.Schema(
  {
    salary: {
      type: Number,
      required: [true, 'Please add a salary'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Salary', salarySchema)
