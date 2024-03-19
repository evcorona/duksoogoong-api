const mongoose = require('mongoose')

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

const connect = mongoose.connect(DB_URL)

module.exports = { connect }
