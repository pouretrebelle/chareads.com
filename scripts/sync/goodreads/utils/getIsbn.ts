import { BookIntermediary, GoodreadsBook } from '../types'

export const getIsbn13 = (book: GoodreadsBook): BookIntermediary['isbn13'] =>
  book.isbn13 === '=""' ? undefined : book.isbn13.slice(2, 15)
