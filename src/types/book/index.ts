import { GatsbyImageSharpFixed } from '../image'
import { BookCardType } from './card'

export interface Book {
  id: string
  html?: string
  title: string
  author: string
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
  slug: string
  links: {
    long: {
      gr: string
      amzn: string
      bd: string
    }
  }
}
