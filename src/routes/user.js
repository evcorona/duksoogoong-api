const express = require('express')
const user = require('../usecases/user')
// const auth = require('../middlewares/auth')

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const userData = await user.getById(id)

    res.json({
      success: true,
      data: { user: userData },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/tutors', async (req, res) => {
  try {
    const tutors = await user.getAllTutors()

    res.json({
      success: true,
      data: { tutors },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.get('/tutors/school/:id', async (req, res) => {
  try {
    const { id } = req.params
    const tutors = await user.getTutorsBySchool(id)

    res.json({
      success: true,
      data: { tutors },
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const userData = await user.updateById(id, req.body)

    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user: userData },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await user.delete(id)

    res.json({
      success: true,
      message: 'User deleted successfully',
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
