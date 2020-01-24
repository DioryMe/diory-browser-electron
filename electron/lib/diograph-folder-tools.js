const Extractor = require('./diograph-extractor')
const path = require('path')
const fs = require('fs')

// Copy-pasted from:
// - https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
const { resolve } = require('path');
const { readdir } = require('fs').promises;

exports.getFiles = async function(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name);
    return dirent.isDirectory() ? this.getFiles(res) : res;
  }));
  return Array.prototype.concat(...files).concat([dir])
}
// end of copy-paste

exports.listFiles = async function(folderPath) {
  if (!(fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory())) {
    console.log("NOT A FOLDER PATH")
    return
  }
  return this.getFiles(folderPath)
}

exports.generateDiographJSON = async function(folderPath) {
  let diographJSON = {
    name: path.basename(folderPath)
  }
  let filePathList = await this.listFiles(folderPath)
  let dioryList = filePathList.map(filePath => {
    return Extractor.getDiograph(filePath)
  })
  diographJSON['diories'] = dioryList
  return diographJSON
}
