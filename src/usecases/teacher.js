const Teacher = require('../models/Teacher')
const User = require('../models/User')
const { signup } = require('./auth')

async function getAll() {
  const teachers = await Teacher.find({ isActive: true }).populate('school')

  return teachers
}

async function getTeachersBySchoolId(schoolId) {
  const teachers = await Teacher.find({
    schoolId,
    isActive: true,
  }).populate('school')

  return teachers
}

async function getById(id) {
  const teachers = await Teacher.findById(id).populate('school')

  return teachers
}

async function create(data) {
  const emailExist = await User.find({ email: data.email })
  if (emailExist) throw new Error('Email already exists')

  const user = await signup({
    email: data.email,
    role: 'teacher',
  })

  const teacher = await Teacher.create({ ...data, userId: user._id })

  return teacher
}

async function updateById(id, newData) {
  const teacher = await Teacher.findByIdAndUpdate(id, newData)

  return teacher
}

async function deleteById(id) {
  const teacher = await Teacher.findByIdAndUpdate(id, { isActive: false })

  return teacher
}

module.exports = {
  getById,
  getAll,
  getTeachersBySchoolId,
  create,
  updateById,
  deleteById,
}
