// const fs = require('fs')
// const path = require('path')
const superagent = require('superagent')

exports.shareDiograph = async function shareDiograph({ importFolderPath, dioryFolderLocation }) {
  const url = 'https://diory-camera-upload.s3.eu-west-1.amazonaws.com/456-abc'

  // TODO: Download dataobject & thumbnail + convert their paths!
  // Create new folder to My Diory folder
  // const importedFolderPathInDioryFolder = path.join(dioryFolderLocation, path.basename(url))
  // fs.mkdirSync(importedFolderPathInDioryFolder)
  // TODO: Download stuff
  // TODO: Update .image & .data.contentUrl based on copied stuff

  // Read diograph.json if contains one
  const diographJsonUrl = [url, 'diograph.json'].join('/')
  return superagent.get(diographJsonUrl).then((res) => {
    console.log(res.body)
    return res.body
  })
}
