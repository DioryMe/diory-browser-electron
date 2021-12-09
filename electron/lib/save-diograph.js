const fsPromise = require('fs').promises
const path = require('path').posix

exports.saveDiograph = function saveDiograph({ dioryFolderLocation, diograph, rootId }) {
  const diographJsonPath = path.join(dioryFolderLocation, 'diograph.json')
  const fileContent = JSON.stringify({ rootId, diograph }, null, 2)
  return fsPromise.writeFile(diographJsonPath, fileContent).then((err) => {
    if (err) throw err
    console.log(`saveDiograph: Saved diograph.json to ${diographJsonPath}`)
  })
}
