import { GatsbyImageSharpFluid } from './image'

export interface Timestamp {
  t: number
  text: string
  book?: number
}

interface VideoFields {
  timestamps: Timestamp[]
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
