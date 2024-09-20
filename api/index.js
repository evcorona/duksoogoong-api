/* eslint-disable no-console */
require('dotenv').config()

const db = require('../src/lib/db')
const server = require('./server')

db.connect
  .then(() =>
    server.listen('8080', () =>
      console.log('Server DukSooGoong is listening 8080 🚀')
    )
  )
  .catch(error => {
    console.error('Error: ', error)
  })
