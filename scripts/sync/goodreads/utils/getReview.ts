import { GoodreadsBook, BookIntermediary } from '../types'
import { sanitizeQuotes, sanitizeHtml } from './common'

const getReview = (book: GoodreadsBook): BookIntermediary['review'] =>
  book.myReview !== '' ? sanitizeHtml(sanitizeQuotes(book.myReview)) : undefined

export default getReview
