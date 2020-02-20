import fs from 'fs'
import http from 'http'
import https from 'https'

export const writeFile = (
  folder: string,
  fileName: string,
  content: string
): void => {
  fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) throw err
    const path = `${folder}/${fileName}`
    fs.writeFile(path, content, 'utf8', (err) =>
      console.log(err ? err : `Write file ${path}`)
    )
  })
}

export const downloadFile = (
  url: string,
  destFolder: string,
  destFileName: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.mkdir(destFolder, { recursive: true }, (err) => {
      if (err) throw err
      const path = `${destFolder}/${destFileName}`
      const method = url.match(/^https/) ? https : http
      method.get(url, (response) => {
        if (response.statusCode === 404)
          return console.log(`Failed to write file ${path}`)
        const file = fs.createWriteStream(path)

        response.pipe(file)
        file.on('finish', (err) => {
          if (err) reject(err)

          file.close()
          console.log(err ? err : `Write file ${path}`)
          resolve()
        })
      })
    })
  })
}
