const fs = require('fs')

const diographFolderPath = process.argv[2]
const diographPath = `${diographFolderPath}/diograph.json`

if (!diographFolderPath || !fs.existsSync(diographPath)) {
  console.log(diographFolderPath)
  throw new Error('Give diographFolder which exists!')
}

console.log(`Reading and validating ${diographPath}...`)
const raw = fs.readFileSync(diographPath)
const { diograph } = JSON.parse(raw)

Object.keys(diograph).forEach((dioryId) => {
  const diory = diograph[dioryId]
  diory.links &&
    Object.entries(diory.links).forEach(([path, { id }]) => {
      if (!diograph[id]) {
        console.log('Diory', diory)
        console.log('linkId', id)
        throw new Error(`Linked diory doesn't exist in diograph.`)
      }
    })
})

console.log('All good!')
