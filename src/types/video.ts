import { Timestamp } from './timestamp'
import { GatsbyImageSharpFixed, Image } from './image'
import { BookCardType } from './book'

export interface Video {
  id: string
  slug: string
  title: string
  viewCount: number
  commentCount: number
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
  image: GatsbyImageSharpFixed
  relatedBooks: BookCardType[]
}

export interface VideoCardType {
  id: string
  slug: string
  title: string
  viewCount: number
  youtubeId: string
  duration: number
  image: Image
  featured?: boolean
  datePublished: Date
  ownedBy?: {
    rating7?: number
  }
  timestamps?: {
    book?: {
      id: string
    }
  }[]
}

export interface VideoSnapshot extends VideoCardType {
  timestamps: {
    t: number
    book?: {
      id: string
    }
  }[]
}
