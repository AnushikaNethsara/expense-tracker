const asyncHandler = require('express-async-handler')

const Expense = require('../models/expenseModel')
const User = require('../models/userModel')

//add new expense
const addExpense = asyncHandler(async (req, res) => {
  const { expenseName, date, totalAmount, notes, category } = req.body;

  if (!expenseName || !date || !totalAmount) {
    res.status(400);
    throw new Error('Please provide all required fields before adding an expense');
  }

  const newExpense = await Expense.create({
    expenseName,
    date,
    totalAmount,
    notes,
    category,
    userId: req.user.id,
  });

  res.status(201).json(newExpense);
});

//get all expenses by id
const getExpenseByUserId = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ userId: req.user.id, archived: false })

  res.status(200).json(expenses)
})

//delete expense
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    res.status(400)
    throw new Error('Expense not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const result = await Expense.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id })
})


//edit expense
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    res.status(400)
    throw new Error('Expense not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedExpense)
})

// get all archived expense
const getArchiveExpense = asyncHandler(async (req, res) => {
  const archivedExpenses = await Expense.find({ userId: req.user.id, archived: true })

  res.status(200).json(archivedExpenses)
})

module.exports = {
  addExpense,
  getExpenseByUserId,
  deleteExpense,
  updateExpense,
  getArchiveExpense
}
