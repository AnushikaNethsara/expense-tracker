const express = require('express')
const router = express.Router()
const {
  addSalary,
  getSalaryByUserId
} = require('../controllers/salaryController ')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addSalary).get(protect, getSalaryByUserId)

module.exports = router
