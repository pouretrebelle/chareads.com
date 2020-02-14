import { GatsbyImageSharpFluid } from './image'
import { RawTimestamp } from './timestamp'

interface VideoData {
  title: string
  youtubeId: string
  description: string
  datePublished: Date
  image: GatsbyImageSharpFluid
  timestamps: RawTimestamp[]
}

export interface RawVideo extends VideoData {
  fields?: {
    slug?: string
  }
}

export interface Video extends VideoData {
  slug?: string
}

interface VideoCardFields {
  slug: string
}

interface VideoCardData {
  id: string
  title: string
  datePublished: Date
  image: GatsbyImageSharpFluid
}

export interface RawVideoCard extends VideoCardData {
  fields: VideoCardFields
}

export interface VideoCard extends VideoCardFields, VideoCardData {}
