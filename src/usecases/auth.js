const User = require('models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function signup(credentials) {
  const { password, ...userData } = credentials

  const passwordEncrypted = await bcrypt.hash(password, 10)

  return User.create({ password: passwordEncrypted, ...userData })
}

async function login(credentials) {
  const { email, password } = credentials

  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid credentials')

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error('Invalid credentials')

  await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() })

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  )

  return token
}

module.exports = {
  signup,
  login,
}
