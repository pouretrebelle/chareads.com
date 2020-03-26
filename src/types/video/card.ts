import { GatsbyImageSharpFluid } from '../image'

export interface VideoCardType {
  slug: string
  viewCount: number
  id: string
  title: string
  datePublished: Date
  image: GatsbyImageSharpFluid
  featured?: boolean
  youtubeId: string
  ownedBy?: {
    rating7?: number
  }
  timestamps?: {
    book?: {
      id: string
    }
  }[]
}
