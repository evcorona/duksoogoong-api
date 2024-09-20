const express = require('express')
const student = require('../usecases/student')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const studentsData = await student.getAll()

    res.json({
      success: true,
      data: { students: studentsData },
    })
  } catch (error) {
    res.status(400)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,OPTIONS,PATCH,DELETE,POST,PUT'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.json({ success: false, message: error.message })
  }
})
router.get('/school/inactive/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const studentsData = await student.getInactiveBySchool(id)

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

router.get('/teacher/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const studentsData = await student.getStudentsByTeacher(id)

    res.json({
      success: true,
      data: { students: studentsData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = await student.create(req.body)

    res.json({
      success: true,
      message: 'Student created successfully',
      data,
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const studentData = await student.updateById(id, req.body)

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

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    await student.deleteById(id)

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
