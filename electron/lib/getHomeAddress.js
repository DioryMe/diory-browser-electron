const fs = require('fs')
const { settingsStore } = require('./utils')

exports.getHomeAddress = async function getHomeAddress() {
  const address = settingsStore().get('homeAddress')

  if (!fs.existsSync(address)) {
    settingsStore().delete('homeAddress')
    console.log(`getHomeAddress: Removed invalid ${address} from config.json`)
  }

  return { address }
}
