const express = require('express')
const auth = require('../usecases/auth')
const validateAuth = require('../middlewares/auth')

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    await auth.signup(req.body)

    res.json({
      success: true,
      message: 'User created successfully',
    })
  } catch (error) {
    res.status(400)
    res.json({ success: false, message: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const token = await auth.login(req.body)

    res.json({
      success: true,
      message: 'User logged in successfully',
      data: { token },
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.post('/changeCredentials', validateAuth, async (req, res) => {
  try {
    await auth.changeCredentials(req.body)

    res.json({
      success: true,
      message: 'Credentials updated successfully',
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

router.post('/resetCredentials', validateAuth, async (req, res) => {
  try {
    await auth.resetCredentials(req.body)

    res.json({
      success: true,
      message: 'Credentials updated successfully',
    })
  } catch (error) {
    res.status(401)
    res.json({ success: false, message: error.message })
  }
})

module.exports = router
