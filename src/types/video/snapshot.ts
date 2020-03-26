import { VideoCardType } from './card'

export interface VideoSnapshot extends VideoCardType {
  timestamps: {
    t: number
    book?: {
      id: string
    }
  }[]
}
