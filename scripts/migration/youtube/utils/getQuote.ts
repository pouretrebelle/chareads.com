import { YoutubeVideo } from '../types'

const getQuote = (video: YoutubeVideo): string => {
  const matches = video.snippet.description.match(/"(.+)"/)
  if (!matches) return undefined
  return matches[1]
}

export default getQuote
