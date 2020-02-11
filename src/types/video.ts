import { GatsbyImageSharpFluid } from './image'

interface VideoFields {
  timestamps: {
    text: string
    timestamp: number
    reference?: {
      title: string
      author: string
      slug: string
    }
  }
}

interface VideoData {
  title: string
  youtubeId: string
  description: string
  datePublished: Date
  image: GatsbyImageSharpFluid
}

export interface RawVideo extends VideoData {
  fields: VideoFields
}

export interface Video extends VideoFields, VideoData {}

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
