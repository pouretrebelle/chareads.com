import sharp from 'sharp'
import fs from 'fs'
import { walk } from '../utils'

const MAX_HEIGHT = 1000
const QUALITY = 80

walk('content/books', async (err, files) => {
  if (err) return console.error(err)

  const jpgFiles = files.filter((file) => file.match(/\.jpg$/))

  Promise.all(
    jpgFiles.map(async (fileName) => {
      const stream = sharp(fileName)
      const info = await stream.metadata()

      if (info.height <= MAX_HEIGHT) {
        return
      }

      return await stream
        .resize(null, MAX_HEIGHT)
        .jpeg({ quality: QUALITY })
        .toBuffer((err, buffer) => {
          if (err) throw err
          fs.writeFile(fileName, buffer, () => {
            // eslint-disable-next-line
            console.log(`Update image ${fileName}`)
          })
        })
    })
  )
})
