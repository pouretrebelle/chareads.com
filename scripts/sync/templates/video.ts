import { VideoIntermediary } from '../youtube/types'
import sanitizeYmlString from './sanitizeYmlString'

const videoTemplate = (video: VideoIntermediary): string => `---
featured: ${video.featured}

title: ${sanitizeYmlString(video.title)}
youtubeId: ${video.youtubeId}
duration: ${video.duration}
datePublished: ${video.datePublished.slice(0, 10)}
image: cover.jpg
${
  video.ownedBy
    ? `
ownedBy: ${sanitizeYmlString(video.ownedBy)}

quote: |
  
`
    : ''
}

timestamps:
  - t: 20
    text: Summary
  - t: 1:20
    book: Title, Author
---
`

export default videoTemplate
