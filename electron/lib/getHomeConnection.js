const fs = require('fs')
const { settingsStore } = require('./utils')

exports.getHomeConnection = async function getDioryHomeConnection() {
  const connection = settingsStore().get('dioryHomeConnection')

  if (!fs.existsSync(connection)) {
    settingsStore().delete('dioryHomeConnection')
    console.log(
      `getHomeConnection: Removed invalid dioryHomeConnection ${connection} from config.json`
    )
  }

  return { connection }
}
