import { YoutubeVideo, MarkdownTimestamp } from '../types'
import getBookFromString from './getBookFromString'
import { unformatTimestamp } from '../../../../src/utils/formatting/time'

const getTimestamps = (video: YoutubeVideo): MarkdownTimestamp[] => {
  const timestamps = []

  video.snippet.description.split('\n').forEach((line) => {
    const matches = line.match(/^(?:(.+) )?(\d+:\d+)(?: (.+))?$/)
    if (!matches) return

    const text = matches[1] || matches[3]
    if (!text) return

    const book = getBookFromString(text)

    const stamp: MarkdownTimestamp = { t: unformatTimestamp(matches[2]) }

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
