const express = require('express')
const school = require('../usecases/school')
const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const schoolsData = await school.getAll()

    res.json({
      success: true,
      data: { schools: schoolsData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const schoolData = await school.getById(id)

    res.json({
      success: true,
      data: { school: schoolData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const schoolData = await school.create(req.body)

    res.json({
      success: true,
      message: 'School created successfully',
      data: { school: schoolData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const schoolData = await school.updateById(id, req.body)

    res.json({
      success: true,
      message: 'School updated successfully',
      data: { school: schoolData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    await school.delete(id)

    res.json({
      success: true,
      message: 'School and related deleted successfully',
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
