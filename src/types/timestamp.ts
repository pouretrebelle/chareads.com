import { BookSnapshot } from './book'

export interface Timestamp {
  t: number
  text: string
  link?: string
  book?: BookSnapshot
}
