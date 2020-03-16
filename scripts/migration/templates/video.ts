import { VideoIntermediary } from '../youtube/types'
import sanitizeYmlString from './sanitizeYmlString'

const videoTemplate = (video: VideoIntermediary): string => `vetted: false
featured: ${video.featured}

title: ${sanitizeYmlString(video.title)}
youtubeId: ${video.youtubeId}
datePublished: ${video.datePublished.slice(0, 10)}
image: cover.jpg
${
  video.ownedBy
    ? `
ownedBy: ${sanitizeYmlString(video.ownedBy)}
`
    : ''
}${
  video.description
    ? `
description: |
  ${video.description}
`
    : ''
}${
  video.quote
    ? `
quote: |
  ${video.quote}
`
    : ''
}${
  video.timestamps.length
    ? `
timestamps:${video.timestamps
        .map(
          ({ t, text, book }) => `
  - t: ${t}
    ${
      text
        ? `text: ${sanitizeYmlString(text)}`
        : `book: ${sanitizeYmlString(book)}`
    }`
        )
        .join('')}`
    : ''
}
`

export default videoTemplate
