const fs = require('fs')

exports.readDiographJson = function readDiographJson({ diographJsonPath }) {
  let raw
  let json
  try {
    raw = fs.readFileSync(diographJsonPath)
  } catch (e) {
    throw new Error("diographJsonPath doesn't exist")
  }

  try {
    json = JSON.parse(raw)
  } catch (e) {
    throw new Error('diograph.json is malformed')
  }

  return json
}
