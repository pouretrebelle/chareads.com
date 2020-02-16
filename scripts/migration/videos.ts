// data derived from https://developers.google.com/youtube/v3/docs/search/list?apix=true&apix_params=%7B%22part%22%3A%22snippet%22%2C%22forMine%22%3Atrue%2C%22maxResults%22%3A50%2C%22order%22%3A%22date%22%2C%22type%22%3A%22video%22%7D
import youtubeData from './data/youtube'
import { YoutubeVideo } from './youtube/types'

import {
  getTitle,
  getOwnedBy,
  getQuote,
  getDescription,
  getImage,
  getTimestamps,
} from './youtube/utils'

export const structuredYoutubeData = youtubeData.map((video: YoutubeVideo) => ({
  title: getTitle(video),
  ownedBy: getOwnedBy(video),
  youtubeId: video.id.videoId,
  datePublished: video.snippet.publishedAt,
  image: getImage(video),
  quote: getQuote(video),
  description: getDescription(video),
  timestamps: getTimestamps(video),
}))
