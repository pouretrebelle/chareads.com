import { GatsbyImageSharpFluid } from '../image'

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

export interface BookCardType
  extends BookCardFrontmatter,
    BookCardFields,
    BookCardData {}
