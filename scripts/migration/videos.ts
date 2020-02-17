// data derived from https://developers.google.com/youtube/v3/docs/search/list?apix=true&apix_params=%7B%22part%22%3A%22snippet%22%2C%22forMine%22%3Atrue%2C%22maxResults%22%3A50%2C%22order%22%3A%22date%22%2C%22type%22%3A%22video%22%7D
import youtubeData from './data/youtube'
import { YoutubeVideo } from './youtube/types'

import getRatings from './youtube/ratings'
import getTitle from './youtube/utils/getTitle'
import getOwnedBy from './youtube/utils/getOwnedBy'
import getImageUrl from './youtube/utils/getImageUrl'
import getQuote from './youtube/utils/getQuote'
import getDescription from './youtube/utils/getDescription'
import getTimestamps from './youtube/utils/getTimestamps'
import getFolder from './youtube/utils/getFolder'

export const structuredYoutubeData = youtubeData.map((video: YoutubeVideo) => ({
  title: getTitle(video),
  ownedBy: getOwnedBy(video),
  youtubeId: video.id.videoId,
  datePublished: video.snippet.publishedAt,
  image: getImageUrl(video),
  quote: getQuote(video),
  description: getDescription(video),
  timestamps: getTimestamps(video),
  folder: getFolder(video),
}))

export const ratingMap = Object.assign(
  {},
  ...youtubeData.map((video: YoutubeVideo) => getRatings(video))
)
