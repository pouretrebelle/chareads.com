import { YoutubeVideo } from '../types'

const getTitle = (video: YoutubeVideo): string =>
  video.snippet.title.replace(' | Chareads', '')

export default getTitle
