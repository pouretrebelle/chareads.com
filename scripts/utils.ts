import fs from 'fs'
import path from 'path'
import http from 'http'
import https from 'https'

export const walk = (
  dir: string,
  done: (err?: object, results?: string[]) => void
): void => {
  let results = []
  fs.readdir(dir, (err, list) => {
    if (err) return done(err)
    let pending = list.length
    if (!pending) return done(null, results)
    list.forEach((file) => {
      file = path.resolve(dir, file)
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            results = results.concat(res)
            if (!--pending) done(null, results)
          })
        } else {
          results.push(file)
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

export const readFileAsync = (filename: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      filename,
      {
        encoding: 'utf8',
      },
      (err, res) => {
        if (err) reject(err)
        else resolve(res)
      }
    )
  })
}

export const writeFile = (
  folder: string,
  fileName: string,
  content: string
): void => {
  fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) throw err
    const path = `${folder}/${fileName}`
    fs.writeFile(path, content, 'utf8', (err) =>
      // eslint-disable-next-line
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
          // eslint-disable-next-line
          return console.log(`Failed to write file ${path}`)
        const file = fs.createWriteStream(path)

        response.pipe(file)
        file.on('finish', (err) => {
          if (err) reject(err)

          file.close()
          // eslint-disable-next-line
          console.log(err ? err : `Write file ${path}`)
          resolve()
        })
      })
    })
  })
}
