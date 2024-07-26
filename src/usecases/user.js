const User = require('../models/User')

async function getById(id) {
  const users = await User.findById(id).populate('school')

  return users
}

async function getAllAdmins() {
  const admins = await User.find({ role: 'admin' }).populate('school')

  return admins
}

async function getAdminsBySchool(schoolId) {
  const admins = await User.find({ role: 'admin', schoolId }).populate('school')

  return admins
}

async function getAllTeachers() {
  const teachers = await User.find({ role: 'teacher' }).populate('school')

  return teachers
}

async function getTeachersBySchool(schoolId) {
  const teachers = await User.find({
    role: 'teacher',
    schoolId,
  }).populate('school')

  return teachers
}

async function getAllTutors() {
  const tutors = await User.find({ role: 'tutor' }).populate('school')

  return tutors
}

async function getTutorsBySchool(schoolId) {
  const tutors = await User.find({ role: 'tutor', schoolId }).populate('school')

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
  getAllAdmins,
  getAdminsBySchool,
  getAllTeachers,
  getTeachersBySchool,
  getAllTutors,
  getTutorsBySchool,
  updateById,
  deleteById,
}
