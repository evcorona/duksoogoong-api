const Teacher = require('../models/Teacher')
const User = require('../models/User')
const { signup } = require('./auth')

async function getAll() {
  const teachers = await Teacher.find({ isActive: true }).populate('schoolId')

  return teachers
}

async function getTeachersBySchoolId(schoolId) {
  const teachers = await Teacher.find({
    schoolId,
    isActive: true,
  }).populate('userId', 'email')

  return teachers
}

async function getById(id) {
  const teacher = await Teacher.findById(id).populate('userId', 'email')

  return teacher
}

async function create(data) {
  const emailExist = await User.findOne({ email: data.email })

  if (emailExist) throw new Error('Email already exists')

  const role = data?.isAdmin ? 'schoolAdmin' : 'teacher'

  const user = await signup({
    email: data.email,
    role,
  })

  const teacher = await Teacher.create({ ...data, userId: user._id })

  await User.findByIdAndUpdate(user._id, {
    teacherId: teacher._id,
    schoolId: data.schoolId,
  })

  return teacher
}

async function updateById(id, newData) {
  const teacher = await Teacher.findByIdAndUpdate(id, newData)

  const role = newData?.isAdmin ? 'schoolAdmin' : 'teacher'

  await User.findByIdAndUpdate(teacher._id, { role })

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
