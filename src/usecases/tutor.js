const Tutor = require('../models/Tutor')
const User = require('../models/User')
const { signup } = require('./auth')

async function getAll() {
  const tutors = await Tutor.find({ isActive: true }).populate('schoolId')

  return tutors
}

async function getTutorsBySchoolId(schoolId) {
  const tutors = await Tutor.find({
    schoolId,
    isActive: true,
  }).populate('userId', 'email')

  return tutors
}

async function getById(id) {
  const tutor = await Tutor.findById(id).populate('userId', 'email')

  return tutor
}

async function create(data) {
  const emailExist = await User.findOne({ email: data.email })

  if (emailExist) throw new Error('Email already exists')

  const user = await signup({
    email: data.email,
    role: 'tutor',
  })

  const tutor = await Tutor.create({ ...data, userId: user._id })

  await User.findByIdAndUpdate(user._id, {
    tutorId: tutor._id,
  })

  return tutor
}

async function updateById(id, newData) {
  const tutor = await Tutor.findByIdAndUpdate(id, newData)

  return tutor
}

async function deleteById(id) {
  const tutor = await Tutor.findByIdAndUpdate(id, { isActive: false })

  return tutor
}

module.exports = {
  getById,
  getAll,
  getTutorsBySchoolId,
  create,
  updateById,
  deleteById,
}
