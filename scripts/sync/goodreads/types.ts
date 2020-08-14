export interface GoodreadsBook {
  title: string
  author: string
  description: string
  review: {
    body: string | boolean
    rating: number
    commentsCount: number
    link: string
  }
  dateRead: string
  dateStarted: string
  dateUpdated: string
  pageCount: number
  publicationDate: string
  publisher: string
  format: string
  isbn13: string | boolean
  shelves: string[]
  imageUrl: string
}

export interface DestructedBookTitle {
  title: string
  subtitle?: string
  series?: {
    title: string
    number: number
  }
}

export interface BookIntermediary extends DestructedBookTitle {
  author: string
  publisher: string
  dateBookPublished: string
  pageCount?: number
  isbn13?: string
  summary: string
  rating5?: number
  rating7?: number
  readDates: [string, string][]
  dateRated: string
  dateReviewed?: string
  tags: string[]
  goodreadsReviewId: string
  bookHeight: number
  review?: string
  folder: string
  image: string
}
