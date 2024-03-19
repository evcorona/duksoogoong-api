const userData = require('../utils/userData')

function adminAuth(request, response, next) {
  try {
    const user = userData(request.headers.authorization)

    if (user.role !== 'admin') throw new Error('Unauthorized')

    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = adminAuth
