const express = require('express')
const student = require('../usecases/student')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const studentsData = await student.getAll()

    res.json({
      success: true,
      data: { students: studentsData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const studentData = await student.getById(id)

    res.json({
      success: true,
      data: { student: studentData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/school/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const studentsData = await student.getStudentsBySchool(id)

    res.json({
      success: true,
      data: { students: studentsData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/tutor/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const studentsData = await student.getStudentsByTutor(id)

    res.json({
      success: true,
      data: { students: studentsData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    await student.create(req.body)

    res.json({
      success: true,
      message: 'Student created successfully',
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const studentData = await student.update(id, req.body)

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: { student: studentData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await student.delete(id)

    res.json({
      success: true,
      message: 'Student deleted successfully',
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
