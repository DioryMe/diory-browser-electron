const { settingsStore } = require('./utils')

// function validateFolder(address) {
//   if (!directoryExists(address)) {
//     const errorMessage = `Provided home address doesn't exist (${address}). Did you use FileDialog to select it?`
//     throw new Error(errorMessage)
//   }
// }

exports.saveHomeAddress = async function saveDioryHomeAddress({ address }) {
  // validateFolder(address)
  settingsStore().set('dioryHomeAddress', address)
  console.log(`saveHomeAddress: Saved homeAddress ${address} to config.json`)

  return { address }
}
