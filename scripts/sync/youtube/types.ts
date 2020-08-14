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
  t: string
  text?: string
  book?: string
}

export interface VideoIntermediary {
  featured: boolean
  title: string
  ownedBy?: string
  youtubeId: string
  datePublished: string
  image: string
  quote?: string
  description?: string
  timestamps: MarkdownTimestamp[]
  folder: string
}
