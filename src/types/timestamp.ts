import { BookSnapshot } from './book'

export interface Timestamp {
  t: number
  text: string
  book?: BookSnapshot
}
