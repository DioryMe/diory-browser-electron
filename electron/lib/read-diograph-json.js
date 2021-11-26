const fs = require('fs')

exports.readDiographJson = function readDiographJson(diographJsonPath) {
  if (!fs.existsSync(diographJsonPath)) {
    const errorMessage = `readDiographJson: Provided diograph folder path doesn't exist (${diographJsonPath}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }

  const raw = fs.readFileSync(diographJsonPath)
  return JSON.parse(raw)
}
