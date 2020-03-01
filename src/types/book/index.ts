import { FixedObject } from 'gatsby-image'
import { GatsbyColors } from '../image'
import { RawBookCard } from './card'

export interface BookFields {
  slug: string
  links: {
    long: {
      gr: string
      amzn: string
      bd: string
    }
  }
}

interface BookFrontmatter {
  title: string
  author: string
  image: {
    childImageSharp: {
      h200: FixedObject
      h300: FixedObject
      h400: FixedObject
    }
    colors?: GatsbyColors
  }
  summary?: string
  tags: string[]
  rating7?: number
  rating5: number
  pageCount: number
  dateRated: Date
  dateBookPublished: Date
  dateReviewed?: Date
  readDates: [Date, Date][]
  relatedBooks: [RawBookCard]
}

interface BookData {
  id: string
  html?: string
}

export interface RawBook extends BookData {
  fields: BookFields
  frontmatter: BookFrontmatter
}

export interface Book extends BookFields, BookFrontmatter, BookData {}
