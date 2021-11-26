const fsPromise = require('fs').promises
const path = require('path').posix

exports.saveDiographJson = function saveDiographJson(dioryFolderLocation, diograph) {
  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
  return fsPromise.writeFile(diographJsonPath, JSON.stringify(diograph, null, 2)).then((err) => {
    if (err) throw err
    console.log(`saveDiographJson: Saved diograph.json to ${diographJsonPath}`)
  })
}
