import { GatsbyImageSharpFluid } from './image'

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
  html?: string
}

export interface RawBook extends BookData {
  frontmatter: BookFrontmatter
}

export interface Book extends BookFrontmatter, BookData {}

interface BookCardFrontmatter {
  title: string
  author: string
  image: GatsbyImageSharpFluid
  rating7?: number
  dateReviewed?: Date
}

interface BookCardFields {
  slug: string
}

interface BookCardData {
  id: string
}

export interface RawBookCard extends BookCardData {
  frontmatter: BookCardFrontmatter
  fields: BookCardFields
}

export interface BookCard
  extends BookCardFrontmatter,
    BookCardFields,
    BookCardData {}
