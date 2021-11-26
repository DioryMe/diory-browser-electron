const fsPromise = require('fs').promises
const path = require('path').posix

exports.saveDiograph = function saveDiograph(dioryFolderLocation, diograph) {
  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
  return fsPromise.writeFile(diographJsonPath, JSON.stringify(diograph, null, 2)).then((err) => {
    if (err) throw err
    console.log(`saveDiograph: Saved diograph.json to ${diographJsonPath}`)
  })
}
