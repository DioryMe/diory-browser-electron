const { settingsStore } = require('./utils')

// function validateFolder(address) {
//   if (!directoryExists(address)) {
//     const errorMessage = `Provided home address doesn't exist (${address}). Did you use FileDialog to select it?`
//     throw new Error(errorMessage)
//   }
// }

exports.saveHomeAddress = async function saveHomeAddress({ address }) {
  // validateFolder(address)
  settingsStore().set('homeAddress', address)
  console.log(`saveHomeAddress: Saved ${JSON.stringify(address)} to config.json`)

  return { address }
}
