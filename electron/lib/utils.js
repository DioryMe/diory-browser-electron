const fs = require('fs')
const path = require('path')

exports.isEmpty = function isEmpty(obj) {
  return typeof obj === 'object' && Object.keys(obj).length === 0
}

exports.copyFolderRecursiveSync = function copyFolderRecursiveSync(source, target) {
  if (!fs.lstatSync(source).isDirectory()) {
    throw new Error(`copyFolderRecursiveSync: source folder (${source}) is not a folder!`)
  }

  fs.readdirSync(source).forEach((itemName) => {
    const sourcePath = path.join(source, itemName)
    const targetPath = path.join(target, itemName)

    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.mkdirSync(targetPath)
      exports.copyFolderRecursiveSync(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}
