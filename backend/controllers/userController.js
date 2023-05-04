const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


//Register new user
const userRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, addressLine1, addressLine2, city, country, password } = req.body

  if (!firstName || !lastName || !dateOfBirth || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields before register')
  }

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists with this email')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName, lastName, dateOfBirth, email, addressLine1, addressLine2, city, country, password: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// login user
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const getUser = await User.findOne({ email })

  if (getUser && (await bcrypt.compare(password, getUser.password))) {
    res.json({
      _id: getUser.id,
      name: getUser.name,
      email: getUser.email,
      token: generateToken(getUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// get user profile
const userProfile = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    const userData = await User.find({ _id: id })

    res.status(200).json(userData[0])

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

//edit profile
const EditProfile = asyncHandler(async (req, res) => {
  let userId = req.params.id;
  const { firstName, lastName, dateOfBirth, addressLine1, addressLine2, city, country } = JSON.parse(req.body.userData);

  if (!userId) {
    res.status(400)
    throw new Error('User ID is required')
  }

  const newProfileData = {
    firstName,
    lastName,
    dateOfBirth,
    addressLine1,
    addressLine2,
    city,
    country,
  }

  if (req.file)
    newProfileData.photo = req.file.filename

  const updatedUser = await User.findByIdAndUpdate(userId, newProfileData, { new: true })

  if (!updatedUser) {
    res.status(400)
    throw new Error('Unable to update user details')
  }

  res.status(200).json(updatedUser)
})

// Get user data
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// JWT Generate
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  userRegister,
  userLogin,
  userProfile,
  getMe,
  EditProfile
}
