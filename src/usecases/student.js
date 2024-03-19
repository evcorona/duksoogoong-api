const Student = require('models/student')

async function getAll() {
  const students = await Student.find({}).populate('school').populate('tutor')

  return students
}

async function getById(id) {
  const student = await Student.findById(id)
    .populate('school')
    .populate('tutor')

  return student
}

async function getStudentsBySchool(schoolId) {
  const students = await Student.find({ school: schoolId })
    .populate('school')
    .populate('tutor')

  return students
}

async function getStudentsByTutor(tutorId) {
  const students = await Student.find({ tutor: tutorId })
    .populate('school')
    .populate('tutor')

  return students
}

async function create(data) {
  const student = await Student.create(data)

  return student
}

async function update(id, newData) {
  const student = await Student.findByIdAndUpdate(id, newData)

  return student
}

async function deleteById(id) {
  const student = await Student.findByIdAndDelete(id)

  return student
}

module.exports = {
  getAll,
  getById,
  getStudentsBySchool,
  getStudentsByTutor,
  create,
  update,
  deleteById,
}
