import { GatsbyImageSharpFluid } from '../image'

export interface VideoCardFields {
  slug: string
  viewCount: number
}

export interface VideoCardData {
  id: string
  title: string
  datePublished: Date
  image: GatsbyImageSharpFluid
  featured?: boolean
}

export interface RawVideoCard extends VideoCardData {
  fields: VideoCardFields
}

export interface VideoCardType extends VideoCardData, VideoCardFields {}
