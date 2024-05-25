const { settingsStore, directoryExists } = require('./utils')

function validateOrInitiateDioryFolder(connection) {
  if (!directoryExists(connection)) {
    const errorMessage = `Provided diory home connection doesn't exist (${connection}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }
}

exports.saveDioryHomeConnection = async function saveDioryHomeConnection({ connection }) {
  validateOrInitiateDioryFolder(connection)
  settingsStore().set('dioryHomeConnection', connection)
  console.log(`saveDioryHomeConnection: Saved dioryHomeConnection ${connection} to config.json`)

  return { connection }
}
