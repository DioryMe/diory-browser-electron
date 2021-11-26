const fs = require('fs')

exports.readDiographJson = function readDiographJson({ diographJsonPath }) {
  if (!fs.existsSync(diographJsonPath)) {
    const errorMessage = `readDiographJson: Provided diographJsonPath (${diographJsonPath}) doesn't exist`
    throw new Error(errorMessage)
  }

  try {
    const raw = fs.readFileSync(diographJsonPath)
    const json = JSON.parse(raw)
    return json
  } catch (e) {
    console.log('readDiographJson failed when reading', diographJsonPath, e.message)
    return undefined
  }
}
