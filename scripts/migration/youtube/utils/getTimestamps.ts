import { YoutubeVideo, MarkdownTimestamp } from '../types'
import getBookFromString from './getBookFromString'

const getTimestamps = (video: YoutubeVideo): MarkdownTimestamp[] => {
  const timestamps = []

  video.snippet.description.split('\n').forEach((line) => {
    const matches = line.match(/^(?:(.+) )?(\d+:\d+)(?: (.+))?$/)
    if (!matches) return

    const text = matches[1] || matches[3]
    if (!text) return

    const book = getBookFromString(text)

    const stamp: MarkdownTimestamp = { t: matches[2].replace(/^0:0?/, '') }

    if (book) {
      stamp.book = book
    } else {
      stamp.text = text
    }

    timestamps.push(stamp)
  })

  return timestamps
}

export default getTimestamps
