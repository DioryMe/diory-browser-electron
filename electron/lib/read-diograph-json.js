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
    backendLogger.info('readDiographJson: reading diograph.json in', path)
    const raw = fs.readFileSync(diographJsonPath)
    const { rootId, diograph } = JSON.parse(raw)
    return { rootId, diograph }
  }

  backendLogger.info('readDiographJson: diograph.json not found in', path)

  return undefined
}
