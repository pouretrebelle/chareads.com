import { GatsbyImageSharpFixed } from './image'

export interface Book {
  id: string
  slug: string
  title: string
  author: string
  html?: string
  publisher: string
  image: GatsbyImageSharpFixed
  summary?: string
  tags: string[]
  rating7?: number
  rating5: number
  pageCount: number
  bookHeight?: number
  dateRated: Date
  dateBookPublished: Date
  dateReviewed?: Date
  readDates: [Date, Date][]
  relatedBooks: BookCardType[]
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
    long: {
      gr: string
      amzn: string
      bd: string
    }
  }
}
