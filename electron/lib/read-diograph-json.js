const fs = require('fs')

exports.readDiographJson = function readDiographJson({ diographJsonPath }) {
  // getDiograph wants readDiographJson to raise error to get it passed to frontend
  if (!fs.existsSync(diographJsonPath)) {
    const errorMessage = `readDiographJson: Provided diographJsonPath (${diographJsonPath}) doesn't exist`
    throw new Error(errorMessage)
  }

  try {
    // This throws error if diographJsonPath doesn't exist
    const raw = fs.readFileSync(diographJsonPath)
    // This throws error if it exists but is malformed
    const json = JSON.parse(raw)
    return json
  } catch (e) {
    // importFolder wants to get undefined if doesn't exists
    // => why we need both?!!?
    // => could we just raise error?
    console.log('readDiographJson failed when reading', diographJsonPath, e.message)
    return undefined
  }
}

// 1. Always raise error, never return undefined
// 2. Two different error messages: 1) doesn't exist 2) malformed
// 3. importFolder should check itself if diograph.json exists and not rely on readDiographJson to check it?
