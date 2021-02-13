const { basename } = require('path')

/**
 * What is this?
 * Is it used somewhere?
 * It has tests though?
 * Is it same as / replaced by generateLinks?
 */
exports.generateLink = function generateLink(path = '', { id } = {}) {
  const key = basename(path)
  return (
    path &&
    id && {
      [key]: { id },
    }
  )
}
