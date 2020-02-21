import { GatsbyImageSharpFluid } from '../image'

interface VideoCardData {
  id: string
  title: string
  datePublished: Date
  image: GatsbyImageSharpFluid
  featured?: boolean
}

export interface RawVideoCard extends VideoCardData {
  fields: {
    slug: string
  }
}

export interface VideoCardType extends VideoCardData {
  slug: string
}
