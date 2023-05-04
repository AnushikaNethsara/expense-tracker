const asyncHandler = require('express-async-handler')

const Salary = require('../models/salaryModel')
const User = require('../models/userModel')


//add new salary and update salary
const addSalary = asyncHandler(async (req, res) => {

  const { salary, userId } = req.body

  if (!salary || !userId) {
    res.status(400)
    throw new Error('Please add all fields before add a salary')
  }

  let savedSalary = await Salary.findOne({ userId: userId });

  if (savedSalary) {
    // If a salary already exists with the user id, update it
    savedSalary.salary = salary;
    savedSalary = await savedSalary.save();
    
  } else {
    // If a salary doesn't exist with the user id, create a new one
    savedSalary = await Salary.create({
      salary: salary,
      userId: userId,
    });
  }

  res.status(200).json(savedSalary)
})

//get salary by user
const getSalaryByUserId = asyncHandler(async (req, res) => {
  const salary = await Salary.findOne({ userId: req.user.id })

  res.status(200).json(salary)
})


module.exports = {
  addSalary,
  getSalaryByUserId
}
