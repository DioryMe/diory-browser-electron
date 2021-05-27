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

let errorCount = 0

Object.keys(diograph).forEach((dioryId) => {
  const diory = diograph[dioryId]
  try {
    // 1. Every link points to a diory that is part of the diograph
    diory.links &&
      Object.entries(diory.links).forEach(([path, { id }]) => {
        if (!diograph[id]) {
          throw new Error(`Linked diory doesn't exist in diograph.`)
        }
      })

    // 2a. latlng has correct structure

    // 2b. No latitude / longitude
    if (diory.latitude || diory.longitude) {
      throw new Error(`Use latlng instead of latitude / longitude`)
    }
  } catch (e) {
    errorCount += 1
    console.log('Diory:', diory)
    console.log(e.message)
  }
})

console.log('------ FINAL RESULTS -----')
errorCount == 0
  ? console.log('All good, your diograph is valid!')
  : console.log(`Invalid diograph, there were ${errorCount} errors.`)
