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
