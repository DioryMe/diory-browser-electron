const { settingsStore } = require('./utils')

exports.saveHomeDiograph = async function saveHomeDiograph({ diograph }) {
  settingsStore().set('homeDiograph', diograph)
  console.log(`saveHomeDiograph: Saved diograph to config.json`)
  return { diograph }
}
