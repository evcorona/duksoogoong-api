const School = require('models/school')

async function getAll() {
  const schools = await School.find({})

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

async function update(id, newData) {
  const school = await School.findByIdAndUpdate(id, newData)

  return school
}

async function deleteById(id) {
  const school = await School.findByIdAndDelete(id)

  return school
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
}
