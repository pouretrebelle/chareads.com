import { YoutubeVideo } from '../types'

const getDescription = (video: YoutubeVideo): string => {
  const videoDescription = video.snippet.description.replace(/\\n/g, '\n')

  const matches = videoDescription.match(
    /^([★|✭☆]+\n+)?(".+"\n+)?(.+)(\n?\n?Timestamps.+↓)?\n([^:]+)/m
  )

  if (!matches) return ''

  const description = matches[3].replace(/Timestamps.+[↓:]/, '').trim()

  // return empty if it has a timestamp or rating in it
  if (description.match(/\d+:\d+/)) return ''
  if (description.match(/Handy timestamps:/)) return ''
  if (description.match(/★/)) return ''

  // return empty if it's the start of the norm content
  if (description.match(/GOODREADS/)) return ''

  return description
}

export default getDescription
