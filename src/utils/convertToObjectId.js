const mongoose = require('mongoose')

function convertToObjectId(id) {
  const objectId = mongoose.isValidObjectId(id)
    ? mongoose.Types.ObjectId.createFromHexString(id)
    : null

  if (!objectId) throw new Error('Invalid id')

  return objectId
}

module.exports = convertToObjectId
