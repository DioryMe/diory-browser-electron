/*
## Run E2E / Visual Regression tests

```
brew install pkg-config cairo pango libpng jpeg giflib librsvg

node visual-regression-compare.js \
  baseline/testcafe-e2e-1/home-with-tools.png \
  test/testcafe-e2e-1/home-with-tools.png
```
*/

const Rembrandt = require('rembrandt')
const fs = require('fs')
const { argv } = require('process')

const baselineImage = argv[2]
const newlyTakenImage = argv[3]

if (!fs.existsSync(baselineImage)) {
  console.log("ERROR: Path didn't exist:", baselineImage)
  process.exit(1)
}

if (!fs.existsSync(newlyTakenImage)) {
  console.log("ERROR: Path didn't exist:", newlyTakenImage)
  process.exit(1)
}

const rembrandt = new Rembrandt({
  imageA: baselineImage,
  imageB: newlyTakenImage,
  thresholdType: Rembrandt.THRESHOLD_PIXELS,
  // Number of different pixels
  // - must be at least 2000 (or maybe 4000) because of id in window row
  maxThreshold: 4000,
  renderComposition: true,
})

// Run the comparison
rembrandt.compare().then((result) => {
  const passOrFail = result.passed ? 'PASS' : 'FAIL'
  const difference = result.differences
  const fileName = `./diffs/${passOrFail}-${difference}-difference.png`
  fs.writeFileSync(fileName, result.compositionImage)

  console.log(`${passOrFail}, Pixel Difference: ${difference}, ${fileName}`)

  if (!result.passed) {
    process.exit('1')
  }
})
