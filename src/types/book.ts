import { GatsbyImageSharpFixed } from './image'

export interface TbrBook {
  title: string
  subtitle?: string
  author: string
  isbn13?: string
}

export interface Book {
  id: string
  slug: string
  title: string
  subtitle?: string
  author: string
  html?: string
  publisher: string
  image: GatsbyImageSharpFixed
  summary?: string
  tags: string[]
  isbn13: string
  rating7?: number
  rating5: number
  pageCount: number
  bookHeight?: number
  dateRated: Date
  dateBookPublished: Date
  dateReviewed?: Date
  dateLastRead: Date
  readDates: [Date, Date][]
  relatedBooks: BookCardType[]
  series?: {
    title: string
    number: number
  }
  links: {
    long: {
      gr: string
      amzn: string
      bd: string
    }
  }
}

export interface BookCardType {
  id: string
  slug: string
  title: string
  author: string
  image: GatsbyImageSharpFixed
  rating7?: number
  dateReviewed?: Date
  bookHeight?: number
  video?: {
    slug: string
  }
}

export interface BookSnapshot {
  slug: string
  title: string
  author: string
  rating7: number
  links: {
    short: {
      gr: string
      amzn: string
      bd: string
    }
    long: {
      gr: string
      amzn: string
      bd: string
    }
  }
}
