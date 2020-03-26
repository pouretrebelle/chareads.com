import { BookSnapshot } from './book/snapshot'

export interface Timestamp {
  t: number
  text: string
  book?: BookSnapshot
}
