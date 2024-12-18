import { Timestamp } from './timestamp'
import { ImageType } from './image'
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
  book: {
    title: string
    author: string
    slug: string
    links: {
      long: {
        gr: string
        amzn: string
        bs: string
      }
    }
    rating7?: number
  }
  image: ImageType
  relatedBooks: BookCardType[]
}

export interface VideoCardType {
  id: string
  slug: string
  title: string
  viewCount: number
  youtubeId: string
  duration: number
  image: ImageType
  featured?: boolean
  datePublished: Date
  book?: {
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
