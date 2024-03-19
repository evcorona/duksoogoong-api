const jwt = require('jsonwebtoken')

function getUserData(token) {
  const payloadDecoded = jwt.decode(token, process.env.JWT_SECRET)

  return { ...payloadDecoded }
}

module.exports = getUserData
