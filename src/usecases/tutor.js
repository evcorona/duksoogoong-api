const Tutor = require('../models/Tutor')
const User = require('../models/User')
const Student = require('../models/Student')
const { signup } = require('./auth')

const convertToObjectId = require('../utils/convertToObjectId')

async function getAll() {
  const tutors = await Tutor.find({ isActive: true }).populate('schoolId')

  return tutors
}

async function getTutorsBySchoolId(schoolId) {
  const tutors = await Student.aggregate([
    { $match: { schoolId: convertToObjectId(schoolId) } },
    { $unset: ['isActive', 'createdAt', 'updatedAt', '__v'] },
    {
      $lookup: {
        from: 'tutors',
        localField: 'tutorId',
        foreignField: '_id',
        as: 'tutor',
      },
    },
    { $unwind: '$tutor' },
    {
      $group: {
        _id: '$tutor._id',
        tutor: { $first: '$tutor' },
        studentsCount: { $sum: 1 },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ['$tutor', { studentsCount: '$studentsCount' }],
        },
      },
    },
    { $sort: { name: 1, lastName: 1 } },
  ])

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
