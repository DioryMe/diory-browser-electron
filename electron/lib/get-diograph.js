const superagent = require('superagent')

exports.getDiograph = async function getDiograph(dioryFolderLocation) {
  const diographJsonUrl = [dioryFolderLocation, 'diograph.json'].join('/')
  return superagent.get(diographJsonUrl).then((res) => {
    console.log(res.body)
    return res.body
  })
}
