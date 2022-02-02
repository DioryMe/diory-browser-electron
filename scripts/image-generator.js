// Usage: node scripts/image-generator.js public/logo192.png test.jpg

const { createCanvas, loadImage } = require('node-canvas')
const fs = require('fs')

const resizeImage = async ({ sourceFilePath, maxWidth, maxHeight }) => {
  const canvas = createCanvas()
  const image = await loadImage(sourceFilePath)

  const resize = () => {
    // Define the size of the canvas
    let { width, height } = image
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width
        width = maxWidth
      }
    } else if (height > maxHeight) {
      width *= maxHeight / height
      height = maxHeight
    }
    canvas.width = width
    canvas.height = height

    // Draw image to canvas
    canvas.getContext('2d').drawImage(image, 0, 0, width, height)

    return canvas.toBuffer()
  }

  return resize()
}

const resizeAndSaveImage = ({ sourceFilePath, destinationFilePath }) => {
  resizeImage({ sourceFilePath, maxHeight: 360, maxWidth: 480 })
    .then((image) => {
      fs.writeFile(destinationFilePath, image, () => {
        console.log('Image saved!')
      })
    })
    .catch((err) => console.log(err))
}

if (!process.argv[2] || !process.argv[3]) {
  throw new Error('Source or destination path not given!')
}

resizeAndSaveImage({
  sourceFilePath: process.argv[2] || 'public/test-image.png',
  destinationFilePath: process.argv[3] || 'test.jpg',
})
