const fs = require('fs')
const backendLogger = require('electron-log')

exports.readDiographJson = function readDiographJson(path) {
  const folderPath = path
  const diographJsonPath = `${path}/diograph.json`

  if (!fs.existsSync(folderPath)) {
    const errorMessage = `readDiographJson: Provided diograph folder path doesn't exist (${folderPath}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }

  if (fs.existsSync(diographJsonPath)) {
    backendLogger.info(`readDiographJson: reading ${path}/diograph.json`)
    const raw = fs.readFileSync(diographJsonPath)
    const { diograph, rootId } = JSON.parse(raw)
    return { diograph, rootId, folderLocation: folderPath }
  }

  backendLogger.info(`readDiographJson: ${path}/diograph.json not found`)

  return undefined
}
