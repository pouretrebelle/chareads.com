import { GatsbyImageSharpFluid } from '../image'

interface VideoSnapshotData {
  id: string
  title: string
  datePublished: Date
  image: GatsbyImageSharpFluid
  timestamps: {
    t: number
    book?: {
      id: string
    }
  }[]
}

export interface RawVideoSnapshot extends VideoSnapshotData {
  fields?: {
    slug?: string
  }
}

export interface VideoSnapshot extends VideoSnapshotData {
  slug?: string
}
