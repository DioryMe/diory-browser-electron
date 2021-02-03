const { basename } = require('path')

// Luo folderin rootDiorylle linkin sen sisältämistä tiedostoista tehtyihin dioreihin
exports.generateLink = function generateLink(path = '', { id } = {}) {
  const key = basename(path)
  return (
    path &&
    id && {
      [key]: { id },
    }
  )
}
