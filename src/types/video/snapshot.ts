import { VideoCardData } from './card'

interface VideoSnapshotData extends VideoCardData {
  timestamps: {
    t: number
    book?: {
      id: string
    }
  }[]
}

export interface RawVideoSnapshot extends VideoSnapshotData {
  fields?: {
    slug: string
  }
}

export interface VideoSnapshot extends VideoSnapshotData {
  slug: string
}
