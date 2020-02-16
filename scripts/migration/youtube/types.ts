export interface YoutubeVideo {
  id: {
    videoId: string
  }
  snippet: {
    publishedAt: string
    title: string
    description: string
    thumbnails: {
      high: {
        url: string
      }
    }
  }
}

export interface MarkdownTimestamp {
  t: number
  text?: string
  book?: string
}
