/* eslint-disable no-console */

const cors = require('cors')
const express = require('express')

const db = require('../src/lib/db')

const authRouter = require('../src/routes/auth')
const userRouter = require('../src/routes/user')
const studentRouter = require('../src/routes/student')
const schoolRouter = require('../src/routes/school')
const teacherRouter = require('../src/routes/teacher')
const tutorRouter = require('../src/routes/tutor')

// Server configuration
const server = express()

// Server tools
server.use(cors())
server.use(express.json())

// Server
server.use('/auth', authRouter)
server.use('/users', userRouter)
server.use('/students', studentRouter)
server.use('/schools', schoolRouter)
server.use('/teachers', teacherRouter)
server.use('/tutors', tutorRouter)

// Server response
server.get('/', (request, response) => {
  response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  response.json({ success: true, message: '🚀 DukSooGoong.api' })
})

// DB Connect
db.connect
  .then(() => {
    server.listen(8080, () => {
      console.log(`Server DukSooGoong is listening on port ${8080} 🚀`)
    })
  })
  .catch(error => console.error('Error: ', error))

module.exports = server
