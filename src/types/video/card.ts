import { GatsbyImageSharpFluid } from '../image'

interface VideoCardData {
  id: string
  title: string
  datePublished: Date
  image: GatsbyImageSharpFluid
}

export interface RawVideoCard extends VideoCardData {
  fields: {
    slug: string
  }
}

export interface VideoCard extends VideoCardData {
  slug: string
}
