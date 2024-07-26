const Student = require('../models/Student')
const User = require('../models/User')

async function getAll() {
  const students = await Student.find({ isActive: true })
    .populate('school')
    .populate('tutor')
    .populate('teacher')

  return students
}

async function getInactiveBySchool(schoolId) {
  const students = await Student.find({ isActive: false, schoolId })
    .populate('school')
    .populate('tutor')
    .populate('teacher')

  return students
}

async function getById(id) {
  const student = await Student.findById(id)
    .populate('school')
    .populate('tutor')
    .populate('teacher')

  return student
}

async function getStudentsBySchool(schoolId) {
  const students = await Student.find({ schoolId })
    .populate('school')
    .populate('tutor')
    .populate('teacher')

  return students
}

async function getStudentsByTutor(tutorId) {
  const students = await Student.find({ tutorId })
    .populate('school')
    .populate('tutor')
    .populate('teacher')

  return students
}

async function getStudentsByTeacher(teacherId) {
  const students = await Student.find({ teacherId })
    .populate('school')
    .populate('tutor')
    .populate('teacher')

  return students
}

async function create(data) {
  const student = await Student.create(data)

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
