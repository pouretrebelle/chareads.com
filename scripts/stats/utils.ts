import fs from 'fs'
import path from 'path'

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
