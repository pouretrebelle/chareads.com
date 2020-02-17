import videoTemplate from './templates/video'
import { VideoIntermediary } from './youtube/types'
import { structuredYoutubeData } from './videos'
import { downloadFile, writeFile } from './writeFile'

structuredYoutubeData.forEach((video: VideoIntermediary): void => {
  const folder = `content/videos/${video.folder}`

  writeFile(folder, 'index.yml', videoTemplate(video))

  downloadFile(
    `http://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    folder,
    'cover.jpg'
  )
})
