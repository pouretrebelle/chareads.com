import fs from 'fs'
import http from 'http'

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
): void => {
  fs.mkdir(destFolder, { recursive: true }, (err) => {
    if (err) throw err
    const path = `${destFolder}/${destFileName}`
    const file = fs.createWriteStream(path)
    http.get(url, (response) => {
      response.pipe(file)
      file.on('finish', (err) => {
        file.close()
        console.log(err ? err : `Write file ${path}`)
      })
    })
  })
}
