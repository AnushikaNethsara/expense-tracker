const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let headerToken

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      headerToken = req.headers.authorization.split(' ')[1]
      const decodedValue = jwt.verify(headerToken, process.env.JWT_SECRET)
      req.user = await User.findById(decodedValue.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not an authorized user')
    }
  }

  if (!headerToken) {
    res.status(401)
    throw new Error('Not an authorized user, no token')
  }
})

module.exports = { protect }
