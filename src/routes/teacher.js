const express = require('express')
const teacher = require('../usecases/teacher')
// const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const teachersData = await teacher.getAll()

    res.json({
      success: true,
      data: { teachers: teachersData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/school/:id', async (req, res) => {
  try {
    const { id } = req.params
    const teachersData = await teacher.getTeachersBySchoolId(id)

    res.json({
      success: true,
      data: { teachers: teachersData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const teacherData = await teacher.getById(id)

    res.json({
      success: true,
      data: { teacher: teacherData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const teacherData = await teacher.create(req.body)

    res.json({
      success: true,
      message: 'Teacher created successfully',
      data: { teacher: teacherData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const teacherData = await teacher.updateById(id, req.body)

    res.json({
      success: true,
      message: 'Teacher updated successfully',
      data: { teacher: teacherData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await teacher.deleteById(id)

    res.json({
      success: true,
      message: 'Teacher and related deleted successfully',
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
