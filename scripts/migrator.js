const fs = require('fs')
const rl = require('readline').createInterface(process.stdin, process.stdout);

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
  : console.log(`Your diograph was migrated, ${changesCount} changes were made.`)


if (changesCount > 0) {

  rl.question("Write changes to diograph.json? yes/[no]: ", (answer) => {
    if(answer && (answer === "yes" || answer === 'y')) {
      console.log ("Writing...");
      // fs.writeFile(filename, data, done);
    } else {
      console.log ("No changes were made to diograph.json.");
    }
    rl.close();
    process.stdin.destroy();
  })
}

