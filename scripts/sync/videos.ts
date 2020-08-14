// data derived from https://developers.google.com/youtube/v3/docs/search/list?apix=true&apix_params=%7B%22part%22%3A%22snippet%22%2C%22forMine%22%3Atrue%2C%22maxResults%22%3A50%2C%22order%22%3A%22date%22%2C%22type%22%3A%22video%22%7D
import youtubeData from './data/youtube'
import { YoutubeVideo, VideoIntermediary } from './youtube/types'

import getFeatured from './youtube/utils/getFeatured'
import getTitle from './youtube/utils/getTitle'
import getOwnedBy from './youtube/utils/getOwnedBy'
import getImageUrl from './youtube/utils/getImageUrl'
import getQuote from './youtube/utils/getQuote'
import getDescription from './youtube/utils/getDescription'
import getTimestamps from './youtube/utils/getTimestamps'
import getFolder from './youtube/utils/getFolder'
import { writeFile, downloadFile } from '../utils'
import videoTemplate from './templates/video'

const structuredYoutubeData = youtubeData.map((video: YoutubeVideo) => ({
  featured: getFeatured(video),
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

structuredYoutubeData.forEach((video: VideoIntermediary): void => {
  const folder = `content/videos/${video.folder}`

  writeFile(folder, 'index.md', videoTemplate(video))

  downloadFile(
    `http://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    folder,
    'cover.jpg'
  )
})
