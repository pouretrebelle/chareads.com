import YAML from 'yaml'
import axios from 'axios'
import prettier from 'prettier'
import dotenv from 'dotenv'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dotenv.config()
dayjs.extend(duration)

import { walk, readFileAsync, writeFile } from '../../utils'
import { Video } from 'types/video'

const formatDuration = (isoString: string): string | number => {
  const duration = dayjs.duration(isoString)
  const minutes = duration.minutes()
  const seconds = duration.seconds()
  if (minutes === 0) return seconds
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

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
            `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&key=${
              process.env.YOUTUBE_API_TOKEN
            }&id=${chunk.join(',')}`
          )
        )
      ).then((responses) => {
        responses.forEach((response) => {
          response.data.items.map((item) => {
            videoData[item.id] = {
              duration: formatDuration(item.contentDetails.duration),
            }
          })
        })
      })
    })
    .catch((err) => console.error(err))

  writeFile(
    'src',
    'youTubeDuration.ts',
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
