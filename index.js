/* eslint-disable no-console */
require('dotenv').config()

const db = require('./src/lib/db')
const server = require('./api/server')

db.connect
  .then(() =>
    server.listen('8080', () => {
      console.log('Server DukSooGoong is listening 🚀')
    })
  )
  .catch(error => {
    console.error('Error: ', error)
  })
