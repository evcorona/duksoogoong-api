const Student = require('../models/Student')
const User = require('../models/User')

async function getAll() {
  const students = await Student.find({ isActive: true })
  // .populate('schoolId')
  // .populate('tutorId')
  // .populate('teacherId')

  return students
}

async function getInactiveBySchool(schoolId) {
  const students = await Student.find({ isActive: false, schoolId })
    .populate('schoolId')
    .populate('tutorId')
    .populate('teacherId')

  return students
}

async function getById(id) {
  const student = await Student.findById(id)
    .populate('schoolId')
    .populate('tutorId')
    .populate('teacherId')

  return student
}

async function getStudentsBySchool(schoolId) {
  const students = await Student.find({ schoolId })
    .populate('schoolId')
    .populate('tutorId')
    .populate('teacherId')

  return students
}

async function getStudentsByTutor(tutorId) {
  const students = await Student.find({ tutorId })
    .populate('schoolId')
    .populate('tutorId')
    .populate('teacherId')

  return students
}

async function getStudentsByTeacher(teacherId) {
  const students = await Student.find({ teacherId })
    .populate('schoolId')
    .populate('tutorId')
    .populate('teacherId')

  return students
}

async function create(data) {
  const student = await Student.findOneAndUpdate(
    {
      name: data.name,
      lastName: data.lastName,
      birthDate: data.birthDate,
    },
    {
      ...data,
      isActive: true,
      lastGradeUpdatedAt: new Date(),
    },
    {
      returnDocument: 'after',
      upsert: true,
    }
  )

  return student
}

async function updateById(id, newData) {
  const student = await Student.findByIdAndUpdate(id, newData)

  if (student?.userId)
    await User.findByIdAndUpdate(student?.userId, {
      name: student.name,
      lastName: student.lastName,
      isActive: student.isActive,
    })

  return student
}

async function deleteById(id) {
  const student = await Student.findByIdAndUpdate(id, { isActive: false })

  if (student?.userId) await User.findByIdAndUpdate(id, { isActive: false })

  return student
}

module.exports = {
  getAll,
  getInactiveBySchool,
  getById,
  getStudentsBySchool,
  getStudentsByTutor,
  getStudentsByTeacher,
  create,
  updateById,
  deleteById,
}
