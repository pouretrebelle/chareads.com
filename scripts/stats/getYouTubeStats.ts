import YAML from 'yaml'
import axios from 'axios'
import prettier from 'prettier'
import dotenv from 'dotenv'

dotenv.config()

import { walk, readFileAsync, writeFile } from '../utils'
import { Video } from 'types/video'

walk('content/videos', async (err, files) => {
  if (err) return console.error(err)

  const ymlFiles = files.filter((file) => file.match(/\.md$/))

  const videoData = {}

  await Promise.all(ymlFiles.map(readFileAsync))
    .then(async (res) => {
      const files = res.map(
        (text: string): Video => {
          const [match, frontmatter] = text.match(/---\n((.|\n)+)\n---/) //eslint-disable-line
          return YAML.parse(frontmatter) || {}
        }
      ) as Video[]
      const ids = files.map((f) => f.youtubeId)

      // the API can only handle 50 ids at a time
      const idsInChunks = ids.reduce(
        (acc, cur) => {
          if (acc[0].length === 50) return [[cur], ...acc]
          acc[0].push(cur)
          return acc
        },
        [[]]
      )

      await Promise.all(
        idsInChunks.map((chunk) =>
          axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&key=${
              process.env.YOUTUBE_API_TOKEN
            }&id=${chunk.join(',')}`
          )
        )
      ).then((responses) => {
        responses.forEach((response) => {
          response.data.items.map((item) => {
            videoData[item.id] = {
              viewCount: Number(item.statistics.viewCount),
              commentCount: Number(item.statistics.commentCount),
            }
          })
        })
      })
    })
    .catch((err) => console.error(err))

  writeFile(
    'src',
    'youTubeStats.ts',
    prettier.format(
      `/* eslint-disable */

    export default ${JSON.stringify(videoData)}`,
      {
        parser: 'babel',
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',
      }
    )
  )
})
