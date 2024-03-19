const cors = require('cors')
const express = require('express')

const authRouter = require('../src/routes/auth')
const userRouter = require('../src/routes/user')
const studentRouter = require('../src/routes/student')
const schoolRouter = require('../src/routes/school')

// Server configuration
const server = express()

// Server tools
server.use(cors())
server.use(express.json())

// Server routes
server.use('/auth', authRouter)
server.use('/user', userRouter)
server.use('/student', studentRouter)
server.use('/school', schoolRouter)

// Server response
server.get('/', (request, response) => {
  response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  response.json({ success: true, message: '🚀 DukSooGoong.api' })
})

module.exports = server
