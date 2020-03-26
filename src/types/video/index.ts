import { Timestamp } from '../timestamp'
import { GatsbyColors } from '../image'
import { BookCardType } from 'types/book/card'

export interface Video {
  slug: string
  viewCount: number
  id: string
  title: string
  youtubeId: string
  html: string
  quote?: string
  datePublished: Date
  timestamps: Timestamp[]
  ownedBy: {
    slug: string
    links: {
      long: {
        gr: string
        amzn: string
        bd: string
      }
    }
    rating7?: number
  }
  image: {
    colors: GatsbyColors
  }
  relatedBooks: BookCardType[]
}
