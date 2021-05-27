const fs = require('fs')
const rl = require('readline').createInterface(process.stdin, process.stdout)

const diographFolderPath = process.argv[2]
const diographPath = `${diographFolderPath}/diograph.json`

if (!diographFolderPath || !fs.existsSync(diographPath)) {
  console.log(diographFolderPath)
  throw new Error('Give diographFolder which exists!')
}

console.log(`Migrating ${diographPath}...`)
const raw = fs.readFileSync(diographPath)
const { diograph } = JSON.parse(raw)

let changesCount = 0

Object.keys(diograph).forEach((dioryId) => {
  const diory = diograph[dioryId]

  // 1. latitude & longitude to latlng
  if (diory.latitude && diory.longitude) {
    diory.latlng = `${diory.latitude}, ${diory.longitude}`
    delete diory.latitude
    delete diory.longitude
    changesCount += 1
    console.log('latlng migrated for diory:', diory)
  }
})

console.log('------ FINAL RESULTS -----')
changesCount === 0
  ? console.log('No need to migrate anything, all good!')
  : console.log(`Your diograph needs to be migrated, ${changesCount} changes were made.`)

// Saving & backuping diograph.json
if (changesCount > 0) {
  rl.question('Write changes to diograph.json? yes/[no]: ', (answer) => {
    if (answer && (answer === 'yes' || answer === 'y')) {
      const originalDiograph = JSON.parse(raw)
      const migratedDiograph = JSON.parse(raw)
      migratedDiograph.diograph = diograph
      fs.writeFile(
        `${diographPath}.old-${parseInt(Math.random() * 10e5)}`,
        JSON.stringify(originalDiograph, null, 2),
        () => {}
      )
      fs.writeFile(diographPath, JSON.stringify(migratedDiograph, null, 2), () => {
        console.log('Migration done and previous version saved as diograph.json.old!')
      })
    } else {
      console.log('No changes were made to diograph.json.')
    }
    rl.close()
    process.stdin.destroy()
  })
} else {
  rl.close()
  process.stdin.destroy()
}
