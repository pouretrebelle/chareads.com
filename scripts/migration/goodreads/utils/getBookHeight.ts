import { GoodreadsBook } from '../types'

const getBookHeight = (book: GoodreadsBook): number => {
  if (book.shelves.includes('pub-penguin-modern')) return 160
  if (book.shelves.includes('pub-little-black-classics')) return 160
  if (book.shelves.includes('pub-great-ideas')) return 179
  if (book.shelves.includes('pub-very-short-introductions')) return 172

  switch (book.format) {
    case 'Hardcover':
      return 220
      break
    case 'Audiobook':
      return 150
      break
    default:
      return 198
  }
}

export default getBookHeight
