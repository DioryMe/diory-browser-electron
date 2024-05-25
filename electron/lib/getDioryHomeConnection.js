const fs = require('fs')
const { settingsStore } = require('./utils')

exports.getDioryHomeConnection = async function getDioryHomeConnection() {
  const connection = settingsStore().get('dioryHomeConnection')

  if (!fs.existsSync(connection)) {
    settingsStore().delete('dioryHomeConnection')
    console.log(
      `getDioryHomeConnection: Removed invalid dioryHomeConnection ${connection} from config.json`
    )
    throw new Error('Diory home not found')
  }

  return { connection }
}
