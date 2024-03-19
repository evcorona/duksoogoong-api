const User = require('../models/User')

async function getById(id) {
  const users = await User.findById(id).populate('school')

  return users
}

async function getAllTeachers() {
  const teachers = await User.find({ role: 'teacher' }).populate('school')

  return teachers
}

async function getTeachersBySchool(schoolId) {
  const teachers = await User.find({
    role: 'teacher',
    school: schoolId,
  }).populate('school')

  return teachers
}

async function getAllTutors() {
  const tutors = await User.find({ role: 'tutor' }).populate('school')

  return tutors
}

async function getTutorsBySchool(schoolId) {
  const tutors = await User.find({ role: 'tutor', school: schoolId }).populate(
    'school'
  )

  return tutors
}

async function update(id, newData) {
  const user = await User.findByIdAndUpdate(id, newData)

  return user
}

async function deleteById(id) {
  const user = await User.findByIdAndDelete(id)

  return user
}

module.exports = {
  getById,
  getAllTeachers,
  getTeachersBySchool,
  getAllTutors,
  getTutorsBySchool,
  update,
  deleteById,
}
