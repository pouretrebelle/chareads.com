import { YoutubeVideo } from '../types'

const getImageUrl = (video: YoutubeVideo): string =>
  `https://img.youtube.com/vi/${video.id.videoId}/maxresdefault.jpg`

export default getImageUrl
