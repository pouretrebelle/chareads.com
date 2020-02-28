import { VideoCardData, VideoCardFields } from './card'

interface VideoSnapshotData extends VideoCardData {
  timestamps: {
    t: number
    book?: {
      id: string
    }
  }[]
}

export interface RawVideoSnapshot extends VideoSnapshotData {
  fields: VideoCardFields
}

export interface VideoSnapshot extends VideoSnapshotData, VideoCardFields {}
