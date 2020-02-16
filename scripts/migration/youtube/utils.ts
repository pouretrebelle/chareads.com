import { YoutubeVideo } from './types'

export const getTitle = (video: YoutubeVideo): string =>
  video.snippet.title.replace(' | Chareads', '')

export const getOwnedBy = (video: YoutubeVideo): string => {
  const videoTitle = getTitle(video)
  const matches = videoTitle.match(/([^&|]+) by (.+)/)

  if (!matches) return undefined

  const title = matches[1].trim().replace(/Great Ideas #[0-9]+: /, '')
  const author = matches[2]

  return `${title}, ${author}`
}

export const getImage = (video: YoutubeVideo): string =>
  `https://img.youtube.com/vi/${video.id.videoId}/maxresdefault.jpg`

export const getQuote = (video: YoutubeVideo): string => {
  const matches = video.snippet.description.match(/"(.+)"/)
  if (!matches) return undefined
  return matches[1]
}

export const getDescription = (video: YoutubeVideo): string => {
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
