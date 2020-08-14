import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

import { YoutubeVideo, VideoIntermediary } from './youtube/types'

import getFeatured from './youtube/utils/getFeatured'
import getTitle from './youtube/utils/getTitle'
import getOwnedBy from './youtube/utils/getOwnedBy'
import getDuration from './youtube/utils/getDuration'
import getImageUrl from './youtube/utils/getImageUrl'
import getQuote from './youtube/utils/getQuote'
import getDescription from './youtube/utils/getDescription'
import getTimestamps from './youtube/utils/getTimestamps'
import getFolder from './youtube/utils/getFolder'
import { writeFile, downloadFile } from '../utils'
import videoTemplate from './templates/video'

const CHANNEL_ID = 'UCgxfnNXGCEPmcon9aGLviRQ'
const VIDEO_COUNT = 2

const syncVideos = async (): Promise<void> => {
  const listDataRes = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${VIDEO_COUNT}&order=date&type=video&key=${process.env.YOUTUBE_API_TOKEN}`
  )

  const videoIds = listDataRes.data.items.map((item) => item.id.videoId)

  const videoRes = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&key=${
      process.env.YOUTUBE_API_TOKEN
    }&id=${videoIds.join(',')}`
  )

  const structuredYoutubeData = videoRes.data.items.map(
    (video: YoutubeVideo) => ({
      featured: getFeatured(video),
      title: getTitle(video),
      ownedBy: getOwnedBy(video),
      youtubeId: video.id,
      duration: getDuration(video),
      datePublished: video.snippet.publishedAt,
      image: getImageUrl(video),
      quote: getQuote(video),
      description: getDescription(video),
      timestamps: getTimestamps(video),
      folder: getFolder(video),
    })
  )

  structuredYoutubeData.forEach((video: VideoIntermediary): void => {
    const folder = `content/videos/${video.folder}`

    writeFile(folder, 'index.md', videoTemplate(video))

    downloadFile(
      `http://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
      folder,
      'cover.jpg'
    )
  })
}

syncVideos()
