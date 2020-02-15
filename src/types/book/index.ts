import { GatsbyImageSharpFluid } from '../image'

interface BookFrontmatter {
  title: string
  author: string
  image: GatsbyImageSharpFluid
  summary?: string
  tags: string[]
  rating7?: number
  rating5: number
  pageCount: number
  isbn13: number
  dateRated: Date
  dateBookPublished: Date
  dateReviewed?: Date
  readDates: [Date, Date][]
}

interface BookData {
  id: string
  html?: string
}

export interface RawBook extends BookData {
  frontmatter: BookFrontmatter
}

export interface Book extends BookFrontmatter, BookData {}
