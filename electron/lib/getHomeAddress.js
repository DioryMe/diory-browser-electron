const fs = require('fs')
const { settingsStore } = require('./utils')

exports.getHomeAddress = async function getDioryHomeAddress() {
  const address = settingsStore().get('dioryHomeAddress')

  if (!fs.existsSync(address)) {
    settingsStore().delete('dioryHomeAddress')
    console.log(`getHomeAddress: Removed invalid dioryHomeAddress ${address} from config.json`)
  }

  return { address }
}
