import YAML from 'yaml'
import axios from 'axios'
import prettier from 'prettier'
import dotenv from 'dotenv'

dotenv.config()

import { writeFile } from '../migration/writeFile'
import { walk, readFileAsync } from './utils'
import { RawVideo } from 'types/video'

walk('content/videos', async (err, files) => {
  if (err) return console.error(err)

  const ymlFiles = files.filter((file) => file.match(/\.yml$/))

  const viewCounts = {}

  await Promise.all(ymlFiles.map(readFileAsync))
    .then(async (res) => {
      const files = res.map(YAML.parse) as RawVideo[]
      const ids = files.map((f) => f.youtubeId)

      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&key=${
        process.env.YOUTUBE_API_TOKEN
      }&id=${ids.join(',')}`

      await axios.get(url).then((response) => {
        response.data.items.map((item) => {
          viewCounts[item.id] = Number(item.statistics.viewCount)
        })
      })
    })
    .catch((err) => console.error(err))

  writeFile(
    'src',
    'viewCounts.ts',
    prettier.format(
      `/* eslint-disable */

    export default ${JSON.stringify(viewCounts)}`,
      {
        parser: 'babel',
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      }
    )
  )
})
