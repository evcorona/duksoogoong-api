const School = require('../models/School')
const Student = require('../models/Student')
const User = require('../models/User')

async function getAll() {
  const schools = await School.find({ isActive: true })

  return schools
}

async function getById(id) {
  const school = await School.findById(id)

  return school
}

async function create(data) {
  const school = await School.create(data)

  return school
}

async function updateById(id, newData) {
  const school = await School.findByIdAndUpdate(id, newData)

  return school
}

async function deleteById(id) {
  const school = await School.findByIdAndUpdate(id, { isActive: false })

  await User.updateMany({ schoolId: id }, { isActive: false })
  await Student.updateMany({ schoolId: id }, { isActive: false })

  return school
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
