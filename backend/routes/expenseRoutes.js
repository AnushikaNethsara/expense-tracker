const express = require('express')
const router = express.Router()
const {
  addExpense,
  getExpenseByUserId,
  deleteExpense,
  updateExpense
} = require('../controllers/expenseController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addExpense).get(protect, getExpenseByUserId)
router.route('/:id').delete(protect, deleteExpense).put(protect, updateExpense)


module.exports = router
