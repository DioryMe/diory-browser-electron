const fs = require('fs')
const backendLogger = require('electron-log')

exports.readDiographJson = function readDiographJson(diographJsonPath) {
  if (!fs.existsSync(diographJsonPath)) {
    const errorMessage = `readDiographJson: Provided diograph folder path doesn't exist (${diographJsonPath}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }

  backendLogger.info(`readDiographJson: reading ${diographJsonPath}`)
  const raw = fs.readFileSync(diographJsonPath)
  return JSON.parse(raw)
}
