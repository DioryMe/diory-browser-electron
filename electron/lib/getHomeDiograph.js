const { settingsStore } = require('./utils')

exports.getHomeDiograph = async function getHomeDiograph() {
  const diograph = settingsStore().get('homeDiograph')
  return { diograph }
}
