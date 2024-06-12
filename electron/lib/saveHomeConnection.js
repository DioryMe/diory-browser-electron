const { settingsStore, directoryExists } = require('./utils')

function validateFolder(address) {
  if (!directoryExists(address)) {
    const errorMessage = `Provided home address doesn't exist (${address}). Did you use FileDialog to select it?`
    throw new Error(errorMessage)
  }
}

exports.saveHomeConnection = async function saveDioryHomeConnection({ connection }) {
  validateFolder(connection.address)
  settingsStore().set('dioryHomeConnection', connection)
  console.log(`saveHomeConnection: Saved homeConnection ${connection} to config.json`)

  return { connection }
}
