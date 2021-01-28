import { GoodreadsBook, BookIntermediary } from '../types'
import getTags from './getTags'

const getBookHeight = (book: GoodreadsBook): BookIntermediary['bookHeight'] => {
  const tags = getTags(book)

  if (tags.includes('pub-penguin-modern')) return 160
  if (tags.includes('pub-little-black-classics')) return 160
  if (tags.includes('pub-great-ideas')) return 179
  if (tags.includes('pub-very-short-introductions')) return 172

  switch (book.binding) {
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
