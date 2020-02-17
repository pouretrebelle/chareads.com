import { VideoIntermediary } from './types'

const videoTemplate = (video: VideoIntermediary): string => `title: ${
  video.title
}
youtubeId: ${video.youtubeId}
datePublished: ${video.datePublished.slice(0, 10)}
image: cover.jpg
${
  video.ownedBy
    ? `
ownedBy: ${video.ownedBy}
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
    ${text ? `text: ${text}` : `book: ${book}`}`
        )
        .join('')}`
    : ''
}`

export default videoTemplate
