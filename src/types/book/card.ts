import { GatsbyImageSharpFixed } from '../image'

export interface BookCardType {
  title: string
  author: string
  image: GatsbyImageSharpFixed
  rating7?: number
  dateReviewed?: Date
  bookHeight?: number
  slug: string
  id: string
  video?: {
    fields: {
      slug: string
    }
  }
}
