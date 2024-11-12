const User = require('../models/User')

async function getById(id) {
  const users = await User.findById(id)

  return users
}

async function getAllTutors() {
  const tutors = await User.find({ role: 'tutor' })
  return tutors
}

async function getTutorsBySchool(schoolId) {
  const tutors = await User.find({ role: 'tutor', schoolId })
  return tutors
}

async function updateById(id, newData) {
  const user = await User.findByIdAndUpdate(id, newData)

  return user
}

async function deleteById(id) {
  const user = await User.findByIdAndUpdate(id, { isActive: false })

  return user
}

module.exports = {
  getById,
  getAllTutors,
  getTutorsBySchool,
  updateById,
  deleteById,
}
