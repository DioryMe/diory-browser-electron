// Usage: node scripts/image-generator.js public/logo192.png test.jpg

const { join } = require('path')
const { DiographJson } = require('diograph-js')
const { createCanvas, loadImage } = require('node-canvas')
const fs = require('fs')

const diographFolderPath = process.argv[2] || './public/diory-demo-content'
const diographJson = new DiographJson({
  path: join(diographFolderPath, 'diograph.json'),
})

const relativeThumbnailPath = 'images'
const thumbnailPath = join(diographFolderPath, relativeThumbnailPath)
if (!fs.existsSync(thumbnailPath)) {
  fs.mkdirSync(thumbnailPath)
}

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

const resizeAndSaveImage = ({ sourceFilePath, destinationFilePath }) =>
  new Promise((resolve) => {
    resizeImage({ sourceFilePath, maxHeight: 360, maxWidth: 480 }).then((image) => {
      fs.writeFile(destinationFilePath, image, () => {
        console.log('Image saved!')
        resolve(true)
      })
    })
  })

diographJson
  .load()
  .then(() =>
    Promise.all(
      diographJson.search('ImageObject', 'data').map((diory) => {
        // contentUrl must exist in order to make a thumbnail
        if (!(diory.data && diory.data[0] && diory.data[0].contentUrl)) return null

        // // image must be null or start with data to verify that thumbnail doesn't yet exist
        // if (diory.image && !/^data\:image\/png\;base64/.exec(diory.image)) return null

        // TODO: Sanitize file url to absolute path (REMOVE THIS HORRORNESS!)
        let sanitisedContentUrl
        const { contentUrl } = diory.data[0]
        sanitisedContentUrl = contentUrl.replace(/%20/g, ' ')
        sanitisedContentUrl = sanitisedContentUrl.replace(/a%CC%88/g, 'ä')
        sanitisedContentUrl = sanitisedContentUrl.replace(/o%CC%88/g, 'ö')

        const dioryThumbnailPath = join(relativeThumbnailPath, `${diory.id}.jpg`)
        const params = {
          sourceFilePath: join(diographFolderPath, sanitisedContentUrl),
          destinationFilePath: join(diographFolderPath, dioryThumbnailPath),
        }

        return resizeAndSaveImage(params).then(() => {
          const updatedDiory = diographJson.update(diory.id, {
            image: dioryThumbnailPath,
          })
          console.log(updatedDiory)
        })
      })
    )
  )
  .then(() => {
    diographJson.save()
  })
