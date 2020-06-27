import fs from 'fs'

import { walk, readFileAsync } from '../utils'

walk('content', async (err, files) => {
  if (err) return console.error(err)

  const ymlFiles = files.filter((file) => file.match(/\.md$/))

  await Promise.all(ymlFiles.map(readFileAsync))
    .then(async (files) => {
      files.map(async (text, index) => {
        const path = ymlFiles[index]
        const newText = text.replace(/vetted: true\n{1,2}/, '')

        fs.writeFile(path, newText, 'utf8', (err) =>
          // eslint-disable-next-line
          console.log(err ? err : `Write file ${path}`)
        )
      })
    })
    .catch((err) => console.error(err))
})
