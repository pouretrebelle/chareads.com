import { GatsbyImageSharpFixed } from '../image'

interface BookCardFrontmatter {
  title: string
  author: string
  image: GatsbyImageSharpFixed
  rating7?: number
  dateReviewed?: Date
  bookHeight?: number
}

interface BookCardFields {
  slug: string
}

interface BookCardData {
  id: string
  video?: {
    fields: {
      slug: string
    }
  }
}

export interface RawBookCard extends BookCardData {
  frontmatter: BookCardFrontmatter
  fields: BookCardFields
}

export interface BookCardType
  extends BookCardFrontmatter,
    BookCardFields,
    BookCardData {}
