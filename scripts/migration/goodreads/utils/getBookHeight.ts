import { GoodreadsBook } from '../types'

const getBookHeight = (book: GoodreadsBook): number => {
  switch (book.format) {
    case 'Hardcover':
      return 236
      break
    case 'Audiobook':
      return 150
      break
    default:
      return 198
  }
}

export default getBookHeight
