const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema(
    {
        expenseName: {
            type: String,
            required: [true, 'Please add an expense name'],
        },
        date: {
            type: Date,
            required: [true, 'Please add a date'],
        },
        totalAmount: {
            type: Number,
            required: [true, 'Please add a total amount'],
        },
        notes: {
            type: String,
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
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

module.exports = mongoose.model('Expense', expenseSchema)
