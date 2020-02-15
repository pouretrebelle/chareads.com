import { GatsbyImageSharpFluid } from '../image'
import { RawTimestamp } from '../timestamp'

interface VideoData {
  id: string
  title: string
  youtubeId: string
  description: string
  quote?: string
  datePublished: Date
  image: GatsbyImageSharpFluid
  timestamps: RawTimestamp[]
  ownedBy: {
    fields: {
      slug: string
    }
    frontmatter: {
      rating7?: number
    }
  }
}

export interface RawVideo extends VideoData {
  fields: {
    slug: string
  }
}

export interface Video extends VideoData {
  slug: string
}
