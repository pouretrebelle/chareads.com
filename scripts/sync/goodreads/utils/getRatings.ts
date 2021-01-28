import { GoodreadsBook, BookIntermediary } from '../types'

export const getRating5 = (book: GoodreadsBook): BookIntermediary['rating5'] =>
  book.myRating !== '' ? parseInt(book.myRating, 10) : undefined
