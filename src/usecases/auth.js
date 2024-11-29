const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function signup(credentials) {
  const password = credentials.email.split('@')[0].trim()

  const passwordEncrypted = await bcrypt.hash(password, 10)

  return User.create({ password: passwordEncrypted, ...credentials })
}

async function changeCredentials(credentials) {
  const user = await User.findOne({ email: credentials.email })
  if (!user) throw new Error('Invalid credentials')

  const isValid = await bcrypt.compare(credentials.oldPassword, user.password)
  if (!isValid) throw new Error('Invalid credentials')

  const passwordEncrypted = await bcrypt.hash(credentials.newPassword, 10)

  return User.findByIdAndUpdate(user.id, {
    password: passwordEncrypted,
    isInitialSetup: false,
  })
}

async function resetCredentials(credentials) {
  const user = await User.findOne({ email: credentials.email })
  if (!user) throw new Error('Invalid credentials')

  const password = credentials.email.split('@')[0].trim()

  const passwordEncrypted = await bcrypt.hash(password, 10)

  return User.findByIdAndUpdate(user.id, {
    password: passwordEncrypted,
    isInitialSetup: true,
  })
}

async function login(credentials) {
  const { email, password } = credentials

  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid credentials')

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error('Invalid credentials')

  await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() })

  const token = jwt.sign(
    { id: user._id, role: user.role, isInitialSetup: user.isInitialSetup },
    process.env.JWT_SECRET
  )

  return `Bearer ${token}`
}

module.exports = {
  signup,
  login,
  changeCredentials,
  resetCredentials,
}
