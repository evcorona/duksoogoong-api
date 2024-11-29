const express = require('express')
const tutor = require('../usecases/tutor')
// const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tutorsData = await tutor.getAll()

    res.json({
      success: true,
      data: { tutors: tutorsData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/school/:id', async (req, res) => {
  try {
    const { id } = req.params
    const tutorsData = await tutor.getTutorsBySchoolId(id)

    res.json({
      success: true,
      data: { tutors: tutorsData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const tutorData = await tutor.getById(id)

    res.json({
      success: true,
      data: { tutor: tutorData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const tutorData = await tutor.create(req.body)

    res.json({
      success: true,
      message: 'Tutor created successfully',
      data: { tutor: tutorData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const tutorData = await tutor.updateById(id, req.body)

    res.json({
      success: true,
      message: 'Tutor updated successfully',
      data: { tutor: tutorData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await tutor.deleteById(id)

    res.json({
      success: true,
      message: 'Tutor and related deleted successfully',
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
