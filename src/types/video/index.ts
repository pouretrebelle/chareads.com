import { Timestamp } from '../timestamp'
import { GatsbyColors } from '../image'
import { BookCardType } from 'types/book/card'

interface VideoFields {
  slug: string
  viewCount: number
}

interface VideoData {
  id: string
  title: string
  youtubeId: string
  description: string
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

export interface RawVideo extends VideoData {
  fields: VideoFields
}

export interface Video extends VideoData, VideoFields {}
